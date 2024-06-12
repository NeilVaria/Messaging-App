<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/neilvaria/Messaging-App">
    <img src="https://github.com/NeilVaria/Messaging-App/assets/60001894/6dc80698-5d89-44d4-8a14-409207113dc8" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Chirp Messaging App</h3>

  <p align="center">
    Modern messaging app, built on a real-time communication platform to faciliate seamless conversations between users, leveraging a robust tech stack to deliver a responsive user experience.
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This messaging app began as my contribution towards a group work assignment at University, but has since undergone further development. The aim of the app is to allow users to instantly send and receive messages, in individual chats and group messages.

### How It Works
At its core, the app uses Socket.IO for real-time communication, ensuring that messages are transmitted instantly between users without the need for page refreshes. This real-time capability is essential for maintaining a continuous and engaging conversation flow. The backend is powered by Next.js, a versatile React framework that provides server-side rendering and static site generation.

For data management, the app uses Prisma ORM to interact with a SQLite database. Prisma provides a powerful and type-safe database toolkit, allowing for efficient querying and data manipulation. User authentication and authorization are managed by NextAuth.js, which supports various authentication methods and ensures secure handling of user credentials.

The frontend of the application is styled with Tailwind CSS, offering a responsive and modern user interface that adapts to different screen sizes and devices. The app has been developed to have a reactive and modern user interface across mobile and desktop.

## Key Features

### Real-Time Messaging
- **Instant Communication**: Messages are delivered and received in real-time, ensuring a seamless conversation experience without delays.
- **Socket.IO Integration**: Utilizes Socket.IO for efficient and reliable real-time data transmission, enabling instant message updates and notifications.
- **Online Status**: Displays the online status of users, allowing participants to see who is currently available or active within the chat.


### Secure User Authentication
- **NextAuth.js**: Provides secure user authentication and authorization.
- **Session Management**: Ensures user sessions are managed securely, maintaining user privacy and security.

### Scalable Backend
- **Next.js**: Leveraging the power of Next.js for server-side rendering and static site generation, enhancing the app’s performance and scalability.
- **Prisma ORM**: Efficient database management using Prisma, offering type-safe queries and seamless interaction with the SQLite database.

### Responsive Design
- **Tailwind CSS**: Responsive and modern UI design that adapts to various screen sizes and devices, providing a consistent user experience across desktops, tablets, and smartphones.
- **User-Friendly Interface**: Intuitive and easy-to-navigate interface, ensuring a pleasant user experience.

### Message Receipts
- **Delivery Receipts**: Users are notified when their messages are successfully delivered, enhancing communication transparency.
- **Read Receipts**: Provides information on whether messages have been read by the recipient, ensuring effective communication feedback.
- **Time Since Sent/Received**: Displays the time elapsed since a message was sent or received, keeping users informed about the recency of their conversations.


### Group and Individual Chats
- **Flexible Communication**: Supports both one-on-one and group conversations, catering to different communication needs.
- **Chat Room Management**: Users can create multiple chat rooms for organized and effective group communication.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[![Next][Next.js]][Next-url]
[![TypeScript][TypeScript]][TypeScript-url]
[![Socket.IO][Socket.io]][Socket.io-url]
[![Prisma][Prisma]][Prisma-url]
[![SQLite][SQLite]][SQLite-url]
[![NextAuth.js][NextAuth.js]][NextAuth.js-url]
[![Tailwind CSS][TailwindCSS]][TailwindCSS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To try the project locally follow the installation instructions.

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/neilvaria/Messaging-App.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start development server
   ```js
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

To test the application on a single device, register 2 seperate users. Login to the application with one user, then in either an incognito tab or another browser login to the application with the second user. Create a new chat and select the other user to begin chatting.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Update landing page with improved design for API documentation
- [ ] Deleting messages & chats
- [ ] Managing groups better ( be able to invite and remove users )
- [ ] Email verification on sign up
- [ ] Login page overhaul
- [ ] User account deletion
- [ ] Ability to upload images to use as profile pictures
- [ ] Ability to attach media to messages
- [ ] Modify mobile view to use new mobile viewports to handle toolbars

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Neil Varia  - neilvaria@gmail.com

Project Link: [https://github.com/neilvaria/Messaging-App](https://github.com/neilvaria/Messaging-App)

<p align="right">(<a href="#readme-top">back to top</a>)</p>







<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/neilvaria/Messaging-App.svg?style=for-the-badge
[contributors-url]: https://github.com/neilvaria/Messaging-App/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/neilvaria/Messaging-App.svg?style=for-the-badge
[forks-url]: https://github.com/neilvaria/Messaging-App/network/members
[stars-shield]: https://img.shields.io/github/stars/neilvaria/Messaging-App.svg?style=for-the-badge
[stars-url]: https://github.com/neilvaria/Messaging-App/stargazers
[issues-shield]: https://img.shields.io/github/issues/neilvaria/Messaging-App.svg?style=for-the-badge
[issues-url]: https://github.com/neilvaria/Messaging-App/issues
[license-shield]: https://img.shields.io/github/license/neilvaria/Messaging-App.svg?style=for-the-badge
[license-url]: https://github.com/neilvaria/Messaging-App/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/neilvaria
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Socket.io]: https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white
[Socket.io-url]: https://socket.io/
[Prisma]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[SQLite]: https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white
[SQLite-url]: https://www.sqlite.org/
[NextAuth.js]: https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white
[NextAuth.js-url]: https://next-auth.js.org/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
