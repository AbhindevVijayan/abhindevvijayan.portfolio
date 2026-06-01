# Personal Portfolio

A modern, responsive personal portfolio website built with HTML, CSS, and JavaScript, featuring a Flask backend server and an admin panel for easy content management.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Admin Panel**: Dedicated admin interface for managing portfolio content
- **Project Showcase**: Display your projects with detailed information
- **Resume Integration**: Built-in resume viewer
- **Dynamic Content**: JSON-based data structure for easy content updates
- **Python Backend**: Flask server for handling requests and data management

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Python Flask
- **Data Format**: JSON
- **Styling**: CSS with responsive design principles

## 📁 Project Structure

```
Personal_Portfolio/
├── index.html              # Main portfolio page
├── admin.html              # Admin panel
├── app.js                  # Main application logic
├── admin.js                # Admin panel functionality
├── server.py               # Flask backend server
├── styles.css              # Main styling
└── assets/
    ├── portfolio_data.json # Portfolio information data
    ├── projects.json       # Projects showcase data
    ├── Abhindev_Vijayan_Resume.txt # Resume file
    └── developer_profile.png # Profile image
```

## 🚀 Getting Started

### Prerequisites

- Python 3.7 or higher
- Modern web browser
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AbhindevVijayan/Personal_Portfolio.git
   cd Personal_Portfolio
   ```

2. **Install Python dependencies**
   ```bash
   pip install flask
   ```

3. **Start the Flask server**
   ```bash
   python server.py
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5000` (or the port specified in your server.py)
   - Access the admin panel at `http://localhost:5000/admin` (if configured)

## 📝 Usage

### Viewing Your Portfolio
- Open the main page to showcase your projects and portfolio information
- The responsive design automatically adapts to different screen sizes

### Admin Panel
- Access the admin interface to update portfolio content
- Modify project details and portfolio information
- Changes are reflected in real-time

### Updating Content

Edit the JSON files to update your portfolio:

- **portfolio_data.json**: Update personal information and profile details
- **projects.json**: Add or modify project listings

## 🎨 Customization

1. **Styling**: Modify `styles.css` to change colors, fonts, and layout
2. **Content**: Update JSON files in the `assets/` folder
3. **Structure**: Edit HTML files to add new sections or modify layout
4. **Functionality**: Extend `app.js` with additional features

## 📋 Configuration

Update `server.py` to configure:
- Port number
- Host address
- Static file directories
- API endpoints

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Abhindev Vijayan**
- GitHub: [@AbhindevVijayan](https://github.com/AbhindevVijayan)
- Portfolio: Check out the live version by running this project locally

## 📧 Contact

For questions or inquiries, feel free to reach out through GitHub.

---

**Happy coding!** 🎉
