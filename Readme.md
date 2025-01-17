Here’s the revised and polished version of your README file. It has been improved for better readability, professionalism, and visual appeal. I’ve also fixed formatting issues and added proper markdown syntax.



# Canvas Editor

Canvas Editor is a web application that allows users to search for images, add custom text captions, and download the edited images. Built with React, TypeScript, and Fabric.js, this application provides a seamless user experience for creating personalized images.

![Canvas Editor Screenshot](https://github.com/Durgaprasd25d/my-bio/blob/main/Screenshot%202025-01-18%20004504.png)  
*Screenshot of the Canvas Editor in action.*

![Canvas Editor Screenshot](https://github.com/Durgaprasd25d/my-bio/blob/main/Screenshot%202025-01-18%20004826.png)  
*Screenshot of the image editing interface.*



## ✨ Features

- Image Search: Search for high-quality images using the Pexels API.
- Text Overlay: Add custom text captions to images with adjustable font size, color, and position.
- Image Download: Download edited images in PNG format.
- Responsive Design: Fully responsive UI that works on all screen sizes.
- Gradient Theme: Aesthetic blue and teal gradient theme for a modern look.



## 🛠️ Technologies Used

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS (for styling)
  - Fabric.js (for canvas manipulation)
- API:
  - [Pexels API](https://www.pexels.com/api/) (for image search)
- Icons:
  - Lucide React (for icons)



## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
   bash
   git clone https://github.com/Durgaprasd25d/Canvas-Editor.git
   cd Canvas-Editor
   

2. Install dependencies:
   bash
   npm install
   

3. Set up environment variables:
   - Add your Pexels API key in api.ts file:
     API_KEY=your_pexels_api_key_here
     

4. Run the development server:
   bash
   npm start
   

5. Open the app:
   - Visit `http://localhost:5173` in your browser.



## 🎨 Usage

1. Search for Images:
   - Enter a search term in the search bar and press Enter.
   - Browse through the results displayed in a responsive grid.

2. Edit an Image:
   - Click on an image to open the editor.
   - Add custom text captions using the editor tools.
   - Adjust the text position, font size, and color.

3. Download the Edited Image:
   - Click the "Download Image" button to save the edited image to your device.



## 📂 Folder Structure


Canvas-Editor/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable components (SearchBar, ImageCard, etc.)
│   ├── pages/               # Page components (SearchPage, CanvasPage)
│   ├── services/            # API service layer
│   ├── types/               # TypeScript types
│   ├── App.tsx              # Main application component
│   ├── index.tsx            # Entry point
│   └── ...
├── package.json             # Project dependencies
├── README.md                # Project documentation
└── ...




## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.



## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.



## 🙏 Acknowledgments

- [Pexels](https://www.pexels.com/) for providing the image search API.
- [Fabric.js](http://fabricjs.com/) for canvas manipulation.
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.



## 📞 Contact

For questions or feedback, feel free to reach out:

- Name: Durgaprasad Dalai
- Email: durgaprasaddalai10@gmail.com
- GitHub: [Durgaprasd25d](https://github.com/Durgaprasd25d)



Enjoy using Canvas Editor! 🎨

