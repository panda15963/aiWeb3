import { KeyboardEvent, ChangeEvent, FC, useState } from 'react';
import Navbar from '../navbar';
import Footer from '../Footer';
import { payForEditing, connectWallet } from "@/utils/payment1";

interface AppState {
    aspectRatio: string;
    seed: number;
    outputFormat: string;
    image: string | null;
    loading: boolean;
    errorMessage: string | null;
    removeBackground: File | null;
    controlStrength: number;
    previewUrl: string | null; // Add a property for the preview URL
}

const RemoveBackground: FC = () => {
    const [state, setState] = useState<AppState>({
        aspectRatio: '21:9',
        seed: 0,
        outputFormat: 'png',
        image: null,
        loading: false,
        errorMessage: null,
        removeBackground: null,
        controlStrength: 0.7,
        previewUrl: null, // Initialize preview URL as null
    });

    const generateImage = async () => {
        setState({ ...state, loading: true, errorMessage: null });

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
        formData.append('aspect_ratio', state.aspectRatio);
        formData.append('seed', state.seed.toString());
        formData.append('output_format', state.outputFormat);
        formData.append('control_strength', state.controlStrength.toString());

        if (state.removeBackground) {
            formData.append('image', state.removeBackground);
        } else {
            setState({ ...state, loading: false, errorMessage: 'No sketch image provided.' });
            return;
        }

        const host = `https://api.stability.ai/v2beta/stable-image/edit/remove-background`;

        try {
            const response = await fetch(host, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STABILITY_API_KEY}`,
                    Accept: 'image/*', // Explicitly set the Accept header
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
            const file = e.target.files[0];
            const previewUrl = URL.createObjectURL(file); // Generate preview URL
            setState({ ...state, removeBackground: file, previewUrl });
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
                    <h1 className="text-xl font-bold mb-4 text-center">Remove Background</h1>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Output Format</label>
                        <select
                            name="outputFormat"
                            value={state.outputFormat}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md selectElement"
                            title="Output Format"
                        >
                            <option value="webp">WEBP</option>
                            <option value="jpeg">JPEG</option>
                            <option value="png">PNG</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Upload an Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            title="Upload an image"
                            placeholder="Choose an image file"
                        />
                        {state.previewUrl && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700">Preview:</p>
                                <img src={state.previewUrl} alt="Preview" className="rounded-md shadow-md" />
                            </div>
                        )}
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

export default RemoveBackground;
