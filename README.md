# V VISHNURAJU - Developer Portfolio

A modern, clean, and responsive developer portfolio website showcasing skills, projects, and experience in web, mobile, and game development.

## Features

- **Modern Design**: Clean and professional layout with smooth animations
- **Responsive**: Optimized for all device sizes (mobile, tablet, desktop)
- **Interactive UI**: Hover effects, smooth scrolling, and animated elements
- **Contact Form**: Functional contact form with validation
- **Performance Optimized**: Fast loading with optimized assets

## Sections

1. **Hero Section** - Introduction with call-to-action buttons
2. **About Me** - Professional summary and key highlights
3. **Skills** - Technical skills organized by category
4. **Projects** - Showcase of recent work and projects
5. **Education** - Academic background and certifications
6. **Contact** - Contact information and message form

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome
- **Animations**: AOS (Animate On Scroll)
- **Fonts**: Google Fonts (Inter)

## Getting Started

1. Clone or download the repository
2. Open `index.html` in your web browser
3. The website is ready to use!

## Customization

### Profile Image
Replace the placeholder image URL in the hero section with your actual profile image:
```html
<img src="YOUR_IMAGE_URL" alt="V VISHNURAJU" class="w-full h-full object-cover">
```

### Resume Download
Add your resume file to the project and update the `downloadResume()` function in `script.js`:
```javascript
function downloadResume() {
    const link = document.createElement('a');
    link.href = 'path/to/your/resume.pdf';
    link.download = 'V_VISHNURAJU_Resume.pdf';
    link.click();
}
```

### Contact Form
To make the contact form functional, integrate with a backend service or email service like:
- EmailJS
- Netlify Forms
- Formspree

## Deployment

This portfolio can be easily deployed to:
- **Netlify**: Drag and drop the folder to Netlify
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Push to a GitHub repository and enable Pages

## Contact Information

- **Email**: vishnuraju922732@gail.com
- **GitHub**: [github.com/vvraju56](https://github.com/vvraju56)
- **LinkedIn**: [linkedin.com/in/vishnuraju-v-757b9929b](https://www.linkedin.com/in/vishnuraju-v-757b9929b)

## License

© 2024 V VISHNURAJU | All Rights Reserved
