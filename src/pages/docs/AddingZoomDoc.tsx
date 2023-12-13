import { useEffect } from 'react';
import FrontLayout from "layout/FrontLayout";

const AddingZoomDoc_ = () => {
  return (
    <div>
      <h1>Adding Zoom to Your Account </h1>

      <section>
        <p>
          To integrate Zoom with The ExpertHub, follow the steps below.
        </p>
      </section>

      {/* Choose Platform Section */}
      <section>
        <h4 style={{marginTop: 15}}>Connect Zoom Account</h4>
        <p>
          Navigate to <a href='https://www.experthubllc.com/integrations'>https://www.experthubllc.com/integrations</a> and locate the zoom service column
        </p>
        <p>
          Click the "Connect" button next to Zoom to integrate your Zoom account with your ExpertHub account.
        </p>
        <p>
          If you are already connected, a "Disconnect" button will be displayed.
        </p>
      </section>

      {/* Authorization Section */}
      <section>
        <h4 style={{marginTop: 15}}>Authorization</h4>
        <p>
          If you are not logged in to your Zoom account, a pop-up window will appear, prompting you to sign in and authorize The ExpertHub to access your Zoom account.
        </p>
        <p>
          Follow the on-screen instructions to complete the authorization process.
        </p>
      </section>

      {/* Disconnecting Section */}
      <section>
        <h4 style={{marginTop: 15}}>Disconnecting Zoom</h4>
        <p>
          To disconnect Zoom from The ExpertHub, click the "Disconnect" button. This will revoke the app's access to your Zoom account.
        </p>
      </section>

      {/* Troubleshooting Section */}
      <section>
        <h4 style={{marginTop: 15}}>Troubleshooting</h4>
        <p>
          If you encounter any issues during the integration process, please contact our support team at <a href='mailto:support@experthubllc.com'>support@experthubllc.com</a>.
        </p>
      </section>

      {/* Your page footer */}
      {/* <footer>
        <p>&copy; 2023 Your Company</p>
      </footer> */}
    </div>
  );
};

const AddingZoomDoc = () => {
  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <FrontLayout msg={false}>
      <div className="lg:mx-32">
        <div className="p-3 pl-8 border-b border-gray-200 text-lg">Adding Zoom to Your ExpertHub account</div>
        <AddingZoomDoc_ />
      </div>
    </FrontLayout>
  );
};

export default AddingZoomDoc;
