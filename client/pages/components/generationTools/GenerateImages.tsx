import { FC, useState } from 'react';
import Navbar from '../navbar';
import Footer from '../Footer';
import { payForEditing, connectWallet } from "@/utils/payment2";

interface AppState {
  prompt: string;
  negativePrompt: string;
  aspectRatio: string;
  seed: number;
  outputFormat: string;
  image: string | null;
  loading: boolean;
  errorMessage: string | null;
}

const StableImageCore: FC = () => {
  const [state, setState] = useState<AppState>({
    prompt: '',
    negativePrompt: '',
    aspectRatio: '21:9',
    seed: 0,
    outputFormat: 'png',
    image: null,
    loading: false,
    errorMessage: null,
  });

  const generateImage = async () => {
    setState({ ...state, loading: true, errorMessage: null });

    // 결제 로직 추가
    const wallet = await connectWallet();
    if (!wallet) {
      setState({ ...state, loading: false, errorMessage: "MetaMask 연결 실패" });
      return;
    }

    const paymentSuccess = await payForEditing();
    if (!paymentSuccess) {
      setState({ ...state, loading: false, errorMessage: "결제 실패" });
      return;
    }

    const formData = new FormData();
    formData.append('prompt', state.prompt);
    formData.append('negative_prompt', state.negativePrompt || '');
    formData.append('aspect_ratio', state.aspectRatio);
    formData.append('seed', state.seed.toString());
    formData.append('output_format', state.outputFormat);

    const host = `https://api.stability.ai/v2beta/stable-image/generate/core`;

    try {
      const response = await fetch(host, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STABILITY_API_KEY}`,
          Accept: 'image/*',
        },
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        setState({
          ...state,
          image: url,
          loading: false,
          errorMessage: null,
        });
      } else {
        const errorText = await response.text();
        let parsedErrorMessage = errorText;

        try {
          const errorJson = JSON.parse(errorText);
          if (errorJson.errors && errorJson.errors.length > 0) {
            parsedErrorMessage = errorJson.errors[0];
          }
        } catch (e) {
          console.error('Failed to parse error message:', e);
        }

        setState({
          ...state,
          errorMessage: `${response.status} - ${parsedErrorMessage}`,
          loading: false,
        });
      }
    } catch (err: any) {
      setState({
        ...state,
        loading: false,
        errorMessage: err.message,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.key === 'Enter') {
      generateImage();
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 text-gray-900 p-4">
        <div className="w-full max-w-2xl p-6 bg-white rounded-md shadow-md">
          <h1 className="text-xl font-bold mb-4 text-center">Stable Image Core</h1>
          <p className="text-center text-red-500 mb-4">
            Note: This application is only available in English.
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Prompt</label>
            <p className="text-xs text-gray-500 mb-2">
              Describe the content of the image you want to generate. Example: "beautiful landscape", "futuristic city"
            </p>
            <input
              type="text"
              name="prompt"
              value={state.prompt}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Negative Prompt</label>
            <p className="text-xs text-gray-500 mb-2">
              Describe what you want to exclude from the image. Example: "no people", "dark background"
            </p>
            <input
              type="text"
              name="negativePrompt"
              value={state.negativePrompt}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Aspect Ratio</label>
            <select
              name="aspectRatio"
              value={state.aspectRatio}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              style={{ outline: '2px solid #4A90E2', outlineOffset: '2px' }}
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
            <p className="text-xs text-gray-500 mb-2">
              This is a number that influences image generation. Use the same seed to get the same image with the same prompt.
            </p>
            <input
              type="number"
              name="seed"
              value={state.seed}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Output Format</label>
            <p className="text-xs text-gray-500 mb-2">
              Select the file format for the generated image. Example: PNG, JPEG, WEBP
            </p>
            <select
              name="outputFormat"
              value={state.outputFormat}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              style={{ outline: '2px solid #4A90E2', outlineOffset: '2px' }}
            >
              <option value="webp">WEBP</option>
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
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
          {state.errorMessage && <p className="mt-4 text-red-500">Error: {state.errorMessage}</p>} {/* Display detailed error */}
          {state.image && (
            <div className="mt-6 text-center">
              <img src={state.image} alt="Generated" className="mx-auto rounded-md shadow-md" />
              <a href={state.image} download={`generated_image.${state.outputFormat}`}>
                <button className="mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Download Image
                </button>
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
