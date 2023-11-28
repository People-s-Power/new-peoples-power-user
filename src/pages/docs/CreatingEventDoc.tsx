import { useEffect, useState } from 'react';
import FrontLayout from "layout/FrontLayout"

// Add your styles or use a CSS framework

// const ZoomIntegrationPage = () => {
//   // Replace with your actual documentation content
//   const documentationContent = `
//   # Zoom Integration Documentation

//   ## Adding the App

//   To add our app to your Zoom account, follow these steps:

//   1. Navigate to the Zoom App Marketplace.
//   2. Search for our app and click on it.
//   3. Follow the on-screen instructions to add the app to your Zoom account.

//   ![Adding the App](/images/adding-app.png)

//   ## Using the App

//   Once the app is added, you can enjoy various features:

//   - Feature 1: Explanation and usage details.
//   - Feature 2: Details on how to configure settings.

//   ![Using the App](/images/using-app.png)

//   ## Removing the App

//   To remove the app, go to your Zoom account settings, find our app, and click 'Uninstall.'

//   ## Troubleshooting

//   If you encounter any issues, contact our support team at support@example.com.

//   ## Privacy and Security

//   We prioritize the security and privacy of your data. Read our privacy policy [here](/privacy-policy).
//   `;

//   // Scroll to the top when the component mounts
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div>
//       {/* Your page header */}
//       <h1>Zoom Integration Documentation</h1>

//       {/* Render documentation content from Markdown */}
//       <div dangerouslySetInnerHTML={{ __html: documentationContent }} />

//       {/* Your page footer */}
//       <footer>
//         <p>&copy; 2023 Your Company</p>
//       </footer>
//     </div>
//   );
// };
// 
// export default ZoomIntegrationPage;


const CreatingEventDoc_ = () => {
  return (
    <div>
      {/* Your page header */}
      <h1>Creating an online Event in The ExpertHub</h1>

      {/* Introduction */}
      <section>
        <p>
          To create an event in The ExpertHub, follow the steps below. Choose whether you want to host the online event on Zoom or Microsoft Teams.
        </p>
      </section>

      {/* Choose Platform Section */}
      <section>
        <h2>Choose Platform</h2>
        <p>
          If your event is online, you can choose to host it on either Zoom or Microsoft Teams.
        </p>
        <ol>
          <li>
            <strong>Teams:</strong> If you choose Microsoft Teams and are not signed in, a pop-up window will appear, initiating the Teams authentication flow.
          </li>
          <li>
            <strong>Zoom:</strong> If you choose Zoom and are not signed in, a pop-up window will appear, prompting you to sign in with your Zoom account.
          </li>
          <li>
            If you are already signed in to your chosen platform, proceed to the next step.
          </li>
        </ol>
      </section>

      {/* Fill Event Details Section */}
      <section>
        <h2>Fill Event Details</h2>
        <p>
          After choosing your platform, fill in the necessary details for your event.
        </p>
        <ul>
          <li>Choose the date, time, and duration of the event.</li>
          <li>If hosting on Zoom, sign in with your Zoom account if not already signed in.</li>
        </ul>
        {/* Add any specific form fields or UI elements for event details */}
      </section>

      {/* Create Event Section */}
      <section>
        <h2>Create Event</h2>
        <p>
          Once you've filled in the details, click the "Create Event" button to schedule your event.
        </p>
        {/* Add any additional instructions or visuals for the create event process */}
      </section>

      {/* Conclusion */}
      <section>
        <p>
          That's it! Your event has been created. If you encounter any issues or have questions, please contact our support team at support@example.com.
        </p>
      </section>

      {/* Your page footer */}
      <footer>
        <p>&copy; 2023 Your Company</p>
      </footer>
    </div>
  );
};


const CreatingEventDoc = () => {


  return (
    <FrontLayout msg={false}>
      <div className="lg:mx-32">
        <div className="p-3 pl-8 border-b border-gray-200 text-lg">Creating an Online event</div>
        <CreatingEventDoc_ />
      </div>
    </FrontLayout>
  )
}

export default CreatingEventDoc;
