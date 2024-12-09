import { KeyboardEvent, ChangeEvent, FC, useState } from 'react';
import Navbar from '../navbar';
import Footer from '../Footer';
import { payForEditing, connectWallet } from "@/utils/payment1";

interface AppState {
  prompt: string;
  negativePrompt: string;
  aspectRatio: string;
  seed: number;
  outputFormat: string;
  image: string | null;
  loading: boolean;
  errorMessage: string | null;
  sketchImage: File | null;
  controlStrength: number;
}

const UpscaleImages: FC = () => {
  const [state, setState] = useState<AppState>({
    prompt: '',
    negativePrompt: '',
    aspectRatio: '21:9',
    seed: 0,
    outputFormat: 'png',
    image: null,
    loading: false,
    errorMessage: null,
    sketchImage: null,
    controlStrength: 0.7,
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
    formData.append('control_strength', state.controlStrength.toString());

    if (state.sketchImage) {
      formData.append('image', state.sketchImage);
    } else {
      setState({ ...state, loading: false, errorMessage: 'No sketch image provided.' });
      return;
    }

    const host = `https://api.stability.ai/v2beta/stable-image/upscale/creative`;

    try {
      const response = await fetch(host, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STABILITY_API_KEY}`,
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
        setState({
          ...state,
          errorMessage: `Error: ${response.status} - ${errorText}`,
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setState({ ...state, [name]: type === 'number' ? parseFloat(value) : value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setState({ ...state, sketchImage: e.target.files[0] });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.key === 'Enter') {
      generateImage();
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 text-gray-900 p-4">
        <div className="w-full max-w-2xl p-6 bg-white rounded-md shadow-md">
          <h1 className="text-xl font-bold mb-4 text-center">Start Creative Upscale</h1>
          <p className="text-center text-red-500 mb-4">
            Note: This application is only available in English.
          </p>
          {/* Prompt Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Prompt</label>
            <p className="text-xs text-gray-500 mb-2">
              Describe the content of the image you want to generate. Example: "a medieval castle on a hill"
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
            <label className="block text-sm font-medium text-gray-700">Upload any an Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Output Format</label>
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
            className={`w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white shadow-sm ${state.loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {state.loading ? 'Generating...' : 'Generate Image'}
          </button>
          {state.errorMessage && <p className="mt-4 text-red-500">Error: {state.errorMessage}</p>}
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

export default UpscaleImages;
