import { FC, useState } from 'react';
import axios from 'axios';
import Navbar from '../navbar';
import Footer from '../Footer';

interface AppState {
  prompt: string;
  negativePrompt: string;
  aspectRatio: string;
  seed: number;
  outputFormat: string;
  image: string | null;
  loading: boolean;
  error: string | null;
}

const StableImageCore: FC = () => {
  const [state, setState] = useState<AppState>({
    prompt:
      'A surreal landscape with a floating island in the sky, surrounded by a ring of clouds and a large mountain in the background.',
    negativePrompt: '',
    aspectRatio: '21:9',
    seed: 0,
    outputFormat: 'png',
    image: null,
    loading: false,
    error: null,
  });

  const generateImage = async () => {
    setState({ ...state, loading: true, error: null });

    const params = {
      prompt: state.prompt,
      negative_prompt: state.negativePrompt || '',
      aspect_ratio: state.aspectRatio,
      seed: state.seed,
      output_format: state.outputFormat,
    };

    const host = `https://api.stability.ai/v2beta/stable-image/generate/core`;

    try {
      const response = await axios.post(host, params, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STABILITY_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'image/*',
        },
        responseType: 'arraybuffer',
      });

      if (response.status === 200) {
        const finishReason = response.headers['finish-reason'];
        if (finishReason === 'CONTENT_FILTERED') {
          throw new Error('Generation failed NSFW classifier');
        }

        const blob = new Blob([response.data], { type: `image/${state.outputFormat}` });
        const url = URL.createObjectURL(blob);

        setState({
          ...state,
          image: url,
          loading: false,
          error: null,
        });
      } else {
        console.error('Error response:', response.data);
        setState({
          ...state,
          error: `Error: ${response.status} - ${response.statusText}`,
          loading: false,
        });
      }
    } catch (err: any) {
      console.error('Request failed:', err.response?.data || err.message);
      setState({
        ...state,
        loading: false,
        error: err.message || 'An error occurred during image generation.',
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 text-gray-900 p-4">
        <div className="w-full max-w-2xl p-6 bg-white rounded-md shadow-md">
          <h1 className="text-xl font-bold mb-4">Stable Image Core</h1>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Prompt</label>
            <input
              type="text"
              name="prompt"
              value={state.prompt}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Negative Prompt</label>
            <input
              type="text"
              name="negativePrompt"
              value={state.negativePrompt}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Aspect Ratio</label>
            <select
              name="aspectRatio"
              value={state.aspectRatio}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="21:9">21:9</option>
              <option value="16:9">16:9</option>
              <option value="3:2">3:2</option>
              <option value="5:4">5:4</option>
              <option value="1:1">1:1</option>
              <option value="4:5">4:5</option>
              <option value="2:3">2:3</option>
              <option value="9:16">9:16</option>
              <option value="9:21">9:21</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Seed</label>
            <input
              type="number"
              name="seed"
              value={state.seed}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Output Format</label>
            <select
              name="outputFormat"
              value={state.outputFormat}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="webp">webp</option>
              <option value="jpeg">jpeg</option>
              <option value="png">png</option>
            </select>
          </div>
          <button
            onClick={generateImage}
            disabled={state.loading}
            className={`w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white shadow-sm ${state.loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {state.loading ? 'Generating...' : 'Generate Image'}
          </button>
          {state.error && <p className="mt-4 text-red-500">{state.error}</p>}
          {state.image && (
            <div className="mt-6 text-center">
              <img src={state.image} alt="Generated" className="mx-auto rounded-md shadow-md" />
              <a href={state.image} download={`generated_image.${state.outputFormat}`} className="block mt-2 text-blue-500 hover:underline">
                Download Image
              </a>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StableImageCore;
