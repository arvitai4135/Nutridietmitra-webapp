import React, { useState } from 'react';

const TermsAndConditions = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (sectionId) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionId);
    }
  };

  const sections = [
    {
      id: 1,
      title: "Acceptance of Terms",
      content: (
        <p>By using this website, you agree to abide by these Terms and Conditions, our Privacy Policy, and any other applicable policies. We reserve the right to update or modify these terms at any time without prior notice.</p>
      )
    },
    {
      id: 2,
      title: "Website Usage",
      content: (
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">This Site provides information related to Nutridietmitra's dietetics, sports nutrition, wellness coaching services, and educational content.</li>
          <li className="mb-2">The content is for informational purposes only and does not constitute medical or dietary advice.</li>
          <li className="mb-2">You must be at least 18 years old to use this website. If you are under 18, you may use the Site only with the consent of a parent or guardian.</li>
        </ul>
      )
    },
    {
      id: 3,
      title: "Dietary and Wellness Disclaimer",
      content: (
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">The information provided on this Site is not a substitute for professional medical or dietary advice, diagnosis, or treatment.</li>
          <li className="mb-2">Always seek the advice of a qualified healthcare provider or registered dietitian before making any health-related or dietary decisions.</li>
          <li className="mb-2">Nutridietmitra and the Site assume no liability for any decisions made based on the content provided. Individual results may vary.</li>
        </ul>
      )
    },
    {
      id: 4,
      title: "Intellectual Property Rights",
      content: (
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">All content on this website, including text, images, graphics, logos, and other materials, is the property of Nutridietmitra or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.</li>
          <li className="mb-2">You may not reproduce, distribute, or use any content without obtaining prior written permission from Nutridietmitra.</li>
        </ul>
      )
    },
    {
      id: 5,
      title: "User Conduct",
      content: (
        <div>
          <p className="mb-2">By using this Site, you agree not to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Post, upload, or transmit any harmful, offensive, or inappropriate content.</li>
            <li className="mb-2">Attempt to gain unauthorized access to the website or interfere with its operations.</li>
            <li className="mb-2">Use the Site for illegal or fraudulent purposes.</li>
            <li className="mb-2">Engage in spamming, phishing, or other forms of cyber-attacks.</li>
            <li className="mb-2">Share diet plans or any other copyrighted material from Nutridietmitra.</li>
          </ul>
        </div>
      )
    },
    {
      id: 6,
      title: "Third-Party Links",
      content: (
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">This Site may contain links to third-party websites. We are not responsible for the content, policies, or practices of any third-party sites.</li>
          <li className="mb-2">Clicking on external links is at your own risk.</li>
        </ul>
      )
    },
    {
      id: 7,
      title: "Limitation of Liability",
      content: (
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">We do not guarantee that the Site will be error-free, uninterrupted, or free of viruses.</li>
          <li className="mb-2">Under no circumstances shall Nutridietmitra or its affiliates be liable for any direct, indirect, incidental, or consequential damages arising from your use of the Site or our services.</li>
        </ul>
      )
    },
    {
      id: 8,
      title: "Indemnification",
      content: (
        <p>You agree to indemnify, defend, and hold harmless Nutridietmitra, its affiliates, and employees from any claims, liabilities, damages, and expenses arising from your use of the Site or violation of these Terms.</p>
      )
    },
    {
      id: 9,
      title: "Termination of Access",
      content: (
        <p>We reserve the right to terminate or suspend your access to the Site or our services at any time without notice if you violate these Terms.</p>
      )
    },
    {
      id: 10,
      title: "Governing Law",
      content: (
        <p>These Terms and Conditions are governed by and interpreted under the laws of Rajasthan, India. Any disputes arising out of these Terms shall be resolved in the courts of Jaipur, Rajasthan.</p>
      )
    },
    {
      id: 11,
      title: "Contact Information",
      content: (
        <div>
          <p className="mb-2">For any inquiries regarding these Terms and Conditions, please contact us at:</p>
          <ul className="list-none pl-6 mb-4">
            <li className="mb-2"><span className="font-semibold">Email:</span> Nutridietmitra@gmail.com</li>
            <li className="mb-2"><span className="font-semibold">Address:</span> OM RESIDENCY 93/B2 Mauji Colony, Malviya Nagar, Jaipur, Rajasthan, India.</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="bg-nutricare-bg-light min-h-screen font-sans">
      <div className="w-full mx-auto p-4 md:p-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-nutricare-primary-dark text-white p-6">
            <h1 className="text-2xl md:text-3xl font-bold">Terms and Conditions - Nutridietmitra</h1>
            <p className="mt-2 text-sm md:text-base">Last Updated: 20 March 2025</p>
          </div>
          
          {/* Introduction */}
          <div className="p-6 border-b border-gray-200">
            <p className="text-nutricare-text-dark">
              Welcome to the official website of Nutridietmitra ("we," "our," or "us"). 
              By accessing or using our website (www.nutridietmitra.com) (the "Site"), 
              you agree to comply with and be bound by the following Terms and Conditions. 
              If you do not agree to these terms, please do not use the Site.
            </p>
          </div>
          
          {/* Accordion Sections */}
          <div className="divide-y divide-gray-200">
            {sections.map((section) => (
              <div key={section.id} className="border-b border-gray-200 last:border-b-0">
                <button
                  className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                  onClick={() => toggleSection(section.id)}
                >
                  <h2 className="text-lg md:text-xl font-medium text-nutricare-primary-dark">
                    {section.id}. {section.title}
                  </h2>
                  <span className={`transform transition-transform duration-200 ${expandedSection === section.id ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-nutricare-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                    expandedSection === section.id ? 'max-h-screen' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-nutricare-text-dark">
                    {section.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer */}
          <div className="bg-nutricare-green-dark text-white p-6 text-center">
            <p>Thank you for visiting Nutridietmitra's website!</p>
            <p className="mt-2">© 2025 Nutridietmitra. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;