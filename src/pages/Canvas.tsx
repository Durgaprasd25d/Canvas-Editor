import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { fabric } from "fabric";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Canvas: React.FC = () => {
  const location = useLocation();
  const { image } = location.state as {
    image: { src: { large: string }; alt: string };
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [text, setText] = useState("");
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(true);

  const fetchImageAsDataURL = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to read image as data URL"));
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error fetching image:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: canvasRef.current.clientWidth,
        height: canvasRef.current.clientHeight,
      });
      setFabricCanvas(canvas);

      const resizeCanvas = () => {
        if (canvasRef.current && canvas) {
          canvas.setDimensions({
            width: canvasRef.current.clientWidth,
            height: canvasRef.current.clientHeight,
          });
          canvas.renderAll();
        }
      };

      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();

      // Load image onto canvas
      fetchImageAsDataURL(image.src.large)
        .then((dataURL) => {
          fabric.Image.fromURL(dataURL, (img) => {
            const canvasAspect = canvas.getWidth() / canvas.getHeight();
            const imgAspect = img.width! / img.height!;

            // Scale image to fit canvas while maintaining aspect ratio
            if (imgAspect > canvasAspect) {
              img.scaleToWidth(canvas.getWidth());
            } else {
              img.scaleToHeight(canvas.getHeight());
            }

            img.set({
              left: (canvas.getWidth() - img.getScaledWidth()) / 2,
              top: (canvas.getHeight() - img.getScaledHeight()) / 2,
              selectable: false,
              evented: false,
            });

            canvas.add(img);
            canvas.renderAll();
          });
        })
        .catch((error) => {
          console.error("Error loading image:", error);
        });

      return () => {
        window.removeEventListener("resize", resizeCanvas);
        canvas.dispose();
      };
    }
  }, [image.src.large]);

  const addTextToCanvas = () => {
    if (fabricCanvas && text.trim()) {
      const fabricText = new fabric.Textbox(text, {
        left: 50,
        top: 50,
        fontSize: 20,
        fill: "#000000",
        fontFamily: "Arial",
        editable: true,
      });
      fabricCanvas.add(fabricText);
      fabricCanvas.setActiveObject(fabricText);
      setText("");
    }
  };

  const addShapeToCanvas = (shape: "rectangle" | "circle" | "triangle") => {
    if (fabricCanvas) {
      let shapeObject;
      switch (shape) {
        case "rectangle":
          shapeObject = new fabric.Rect({
            left: 50,
            top: 50,
            width: 100,
            height: 100,
            fill: "rgba(255, 0, 0, 0.5)",
          });
          break;
        case "circle":
          shapeObject = new fabric.Circle({
            left: 50,
            top: 50,
            radius: 50,
            fill: "rgba(0, 0, 255, 0.5)",
          });
          break;
        case "triangle":
          shapeObject = new fabric.Triangle({
            left: 50,
            top: 50,
            width: 100,
            height: 100,
            fill: "rgba(0, 255, 0, 0.5)",
          });
          break;
      }
      if (shapeObject) {
        fabricCanvas.add(shapeObject);
        fabricCanvas.setActiveObject(shapeObject);
      }
    }
  };

  const downloadCanvasAsImage = () => {
    if (fabricCanvas) {
      const dataURL = fabricCanvas.toDataURL({
        format: "png",
        quality: 1,
      });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "canvas-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">Image Editor</h1>
        <div className="bg-white rounded-xl shadow-2xl flex flex-col lg:flex-row items-stretch overflow-hidden gap-6 lg:gap-0">
          <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-white border-2 border-gray-300 rounded-lg shadow-inner flex items-center justify-center">
              <canvas ref={canvasRef} className="w-full h-full"></canvas>
            </div>
          </div>
          <div className="w-full lg:w-[400px] xl:w-[500px] flex flex-col bg-gray-100 p-4 sm:p-6">
            <motion.div
              initial={false}
              animate={{ height: isControlPanelOpen ? "auto" : "3rem" }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md overflow-hidden flex-1"
            >
              <button
                onClick={() => setIsControlPanelOpen(!isControlPanelOpen)}
                className="w-full flex items-center justify-between p-4 text-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Control Panel
                <ChevronDownIcon
                  className={`w-5 h-5 transform transition-transform duration-200 ${
                    isControlPanelOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isControlPanelOpen && (
                <div className="p-4 space-y-6">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Add Text:</label>
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200"
                      placeholder="Enter text here"
                    />
                    <button
                      onClick={addTextToCanvas}
                      className="w-full mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Add Text
                    </button>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Add Shape:</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => addShapeToCanvas("rectangle")}
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200"
                      >
                        Rectangle
                      </button>
                      <button
                        onClick={() => addShapeToCanvas("circle")}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
                      >
                        Circle
                      </button>
                      <button
                        onClick={() => addShapeToCanvas("triangle")}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200"
                      >
                        Triangle
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={downloadCanvasAsImage}
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-md hover:from-teal-600 hover:to-teal-700 transition-all duration-200"
                  >
                    Download Image
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
