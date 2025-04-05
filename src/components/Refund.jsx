import React from 'react';

const RefundPolicyComponent = () => {
  // Custom color variables based on provided colors
  const colors = {
    primaryDark: "#9E0B7F",
    primaryLight: "#D93BB1",
    green: "#ADD01C",
    greenDark: "#8CA417",
    bgLight: "#FCF0F8",
    textDark: "#333333",
    textGray: "#718096",
  };

  return (
    <div 
      className="w-full p-4 md:p-8 rounded-lg shadow-md"
      style={{ backgroundColor: colors.bgLight, fontFamily: 'Arial, sans-serif' }}
    >
      <h1 
        className="text-2xl md:text-3xl font-bold mb-6 text-center"
        style={{ color: colors.primaryDark }}
      >
        Refund and Cancellation Policy - Nutridietmitra
      </h1>
      
      <section className="mb-6">
        <h2 
          className="text-xl font-bold mb-2"
          style={{ color: colors.primaryLight }}
        >
          1. Introduction
        </h2>
        <p 
          className="mb-4"
          style={{ color: colors.textDark }}
        >
          At Nutridietmitra, we are committed to providing personalized and effective dietetics, sports nutrition, 
          and wellness coaching services. This Refund and Cancellation Policy outlines the terms and conditions 
          regarding refunds and cancellations of our services and subscription plans.
        </p>
      </section>

      <section className="mb-6">
        <h2 
          className="text-xl font-bold mb-2"
          style={{ color: colors.primaryLight }}
        >
          2. Cancellation Policy
        </h2>
        
        <h3 
          className="text-lg font-semibold mt-4 mb-2"
          style={{ color: colors.greenDark }}
        >
          Consultation/Appointment Cancellations:
        </h3>
        <ul className="list-disc pl-6 space-y-2" style={{ color: colors.textDark }}>
          <li>Clients can request a cancellation of their scheduled consultation or appointment with a full refund if the cancellation is made at least 24 hours prior to the scheduled time.</li>
          <li>Cancellations made less than 24 hours before the scheduled time may be subject to a cancellation fee, at the discretion of Nutridietmitra.</li>
          <li>If a client fails to show up for a scheduled appointment without any prior notice, no refund will be issued.</li>
        </ul>
        
        <h3 
          className="text-lg font-semibold mt-4 mb-2"
          style={{ color: colors.greenDark }}
        >
          Subscription Plan Cancellations:
        </h3>
        <ul className="list-disc pl-6 space-y-2" style={{ color: colors.textDark }}>
          <li>For subscription-based services (e.g., monthly diet plans, meal delivery), cancellations will take effect at the end of the current billing cycle.</li>
          <li>No partial refunds will be issued for cancellations made during an active subscription period.</li>
          <li>For food delivery subscription, cancellations must be made 48 hours in advance of the next scheduled delivery to avoid charges.</li>
          <li>For any cancellation, the client must send an email to Nutridietmitra@gmail.com.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 
          className="text-xl font-bold mb-2"
          style={{ color: colors.primaryLight }}
        >
          3. Refund Policy
        </h2>
        <p className="mb-2" style={{ color: colors.textDark }}>Refunds will only be considered under the following circumstances:</p>
        <ul className="list-disc pl-6 space-y-2" style={{ color: colors.textDark }}>
          <li>The agreed-upon service was not provided as described.</li>
          <li>There was a documented error in billing or a double charge.</li>
        </ul>
        <ul className="list-disc pl-6 space-y-2 mt-4" style={{ color: colors.textDark }}>
          <li>Refunds are not granted for client dissatisfaction with weight loss results, or other health results, as these results are based on client compliance to the given diet plan.</li>
          <li>Refund requests must be submitted in writing via email to Nutridietmitra@gmail.com within 7 days of the transaction or service date.</li>
          <li>Approved refunds will be processed within 7-14 business days using the original payment method.</li>
          <li>A processing fee may be deducted from the refund amount, depending on the circumstances.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 
          className="text-xl font-bold mb-2"
          style={{ color: colors.primaryLight }}
        >
          4. Non-Refundable Items/Services
        </h2>
        <ul className="list-disc pl-6 space-y-2" style={{ color: colors.textDark }}>
          <li>Personalized diet plans, customized meal plans, and consultation fees are generally non-refundable once the service has commenced.</li>
          <li>Any digital products or downloadable content (e.g., e-books, guides) are non-refundable.</li>
          <li>Food that has already been prepared and/or delivered is non-refundable.</li>
          <li>Any service that has been partially or fully availed is non-refundable.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 
          className="text-xl font-bold mb-2"
          style={{ color: colors.primaryLight }}
        >
          5. Process for Requesting Refunds and Cancellations
        </h2>
        <ul className="list-disc pl-6 space-y-2" style={{ color: colors.textDark }}>
          <li>All refund and cancellation requests must be submitted via email to Nutridietmitra@gmail.com, including the client's name, contact information, order or appointment details, and a clear explanation of the reason for the request.</li>
          <li>Nutridietmitra will review each request and respond within 3-5 business days with a decision.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 
          className="text-xl font-bold mb-2"
          style={{ color: colors.primaryLight }}
        >
          6. Changes to This Policy
        </h2>
        <p style={{ color: colors.textDark }}>
          Nutridietmitra reserves the right to modify or update this Refund and Cancellation Policy at any time without prior notice. 
          Clients are encouraged to review this policy periodically.
        </p>
      </section>

      <section className="mb-6">
        <h2 
          className="text-xl font-bold mb-2"
          style={{ color: colors.primaryLight }}
        >
          7. Contact Information
        </h2>
        <p style={{ color: colors.textDark }}>For any questions or concerns regarding this Refund and Cancellation Policy, please contact us at:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2" style={{ color: colors.textDark }}>
          <li><strong>Email:</strong> Nutridietmitra@gmail.com</li>
          <li><strong>Address:</strong> OM RESIDENCY 93/B2 Mauji Colony, Malviya Nagar, Jaipur, Rajasthan, India.</li>
        </ul>
      </section>

      <div 
        className="p-4 rounded-md mt-8 text-center"
        style={{ backgroundColor: colors.green, color: "#FFFFFF" }}
      >
        <p className="font-medium">By using our services, you acknowledge and agree to this Refund and Cancellation Policy.</p>
      </div>
    </div>
  );
};

export default RefundPolicyComponent;