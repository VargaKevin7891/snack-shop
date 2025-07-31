import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export default function WhyChooseUs() {
  return (
    <section className="why-us">
      <div className="container">
        <h2 className="why-us-title">Why Choose Us</h2>
        <p className="why-us-subtitle">
          We provide the best snacking experience tailored for your taste buds.
        </p>
        <div className="features">
          <div className="feature-card">
            <LocalShippingIcon className="feature-icon" />
            <h3>Fast Delivery</h3>
            <p>Get your snacks quickly with our express delivery service.</p>
          </div>
          <div className="feature-card">
            <HealthAndSafetyIcon className="feature-icon" />
            <h3>Healthy Choices</h3>
            <p>Snack smarter with our nutritious and delicious options.</p>
          </div>
          <div className="feature-card">
            <SupportAgentIcon className="feature-icon" />
            <h3>24/7 Support</h3>
            <p>We're always here to help with your snack cravings.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
