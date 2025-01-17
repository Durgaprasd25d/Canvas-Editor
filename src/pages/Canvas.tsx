import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { fabric } from "fabric";

const Canvas: React.FC = () => {
  const location = useLocation();
  const { image } = location.state as {
    image: { src: { large: string }; alt: string };
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [text, setText] = useState("");

  // Function to fetch and convert the image to a secure data URL
  const fetchImageAsDataURL = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read image as data URL"));
      reader.readAsDataURL(blob);
    });
  };

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);
      setFabricCanvas(canvas);

      // Fetch the image and convert it to a secure data URL
      fetchImageAsDataURL(image.src.large)
        .then((dataURL) => {
          // Load the image onto the canvas
          fabric.Image.fromURL(dataURL, (img) => {
            img.scaleToWidth(500); // Adjust image width
            canvas.setWidth(img.getScaledWidth());
            canvas.setHeight(img.getScaledHeight());
            canvas.add(img);
            canvas.renderAll();

            // Lock the image so it cannot be moved
            img.set({ selectable: false, evented: false });
          });
        })
        .catch((error) => {
          console.error("Error loading image:", error);
        });

      // Cleanup on unmount
      return () => {
        canvas.dispose();
      };
    }
  }, [image.src.large]);

  // Add text to the canvas
  const addTextToCanvas = () => {
    if (fabricCanvas && text.trim()) {
      const fabricText = new fabric.Text(text, {
        left: 100, // Default position
        top: 100, // Default position
        fontSize: 24, // Fixed font size
        fill: "#000000", // Fixed text color
        fontFamily: "Arial",
      });
      fabricCanvas.add(fabricText);
      fabricCanvas.renderAll();
    }
  };

  // Download the canvas as an image
  const downloadCanvasAsImage = () => {
    if (fabricCanvas) {
      const dataURL = fabricCanvas.toDataURL({
        format: "png",
        quality: 1,
      });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "image-with-text.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-4 h-screen flex flex-col bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="flex flex-1 flex-col lg:flex-row gap-4">
        {/* Left Container: Image */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center border rounded-lg overflow-hidden shadow-sm">
          <canvas ref={canvasRef} className="max-w-full max-h-full"></canvas>
        </div>

        {/* Right Container: Features */}
        <div className="flex-1 p-4 bg-white border rounded-lg shadow-sm">
          <div className="space-y-4">
            <label className="block">
              Text:
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <button
              onClick={addTextToCanvas}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-900 text-white py-2 px-4 rounded-md hover:from-blue-900 hover:to-blue-600 transition-all"
            >
              Add Text
            </button>
            <button
              onClick={downloadCanvasAsImage}
              className="w-full bg-gradient-to-r from-teal-400 to-teal-900 text-white py-2 px-4 rounded-md hover:from-teal-900 hover:to-teal-400 transition-all"
            >
              Download Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;