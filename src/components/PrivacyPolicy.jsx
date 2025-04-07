import React, { useState } from 'react';

const PrivacyPolicy = () => {
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
      title: "Information We Collect",
      content: (
        <div>
          <p className="mb-2">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2"><span className="font-semibold">Personal Information:</span> Name, email address, phone number, address, and other details you provide when contacting us, scheduling appointments, or subscribing to our services.</li>
            <li className="mb-2"><span className="font-semibold">Health-Related Information:</span> Any medical history, dietary information, lifestyle habits, or health information you provide for consultation, assessment, and diet plan creation purposes.</li>
            <li className="mb-2"><span className="font-semibold">Payment Information:</span> If applicable, details necessary for processing payments for our services.</li>
            <li className="mb-2"><span className="font-semibold">Technical Data:</span> IP address, browser type, device information, and browsing behavior on our Website.</li>
            <li className="mb-2"><span className="font-semibold">Cookies and Tracking Technologies:</span> Data collected through cookies and similar technologies to improve user experience and Website functionality.</li>
          </ul>
        </div>
      )
    },
    {
      id: 2,
      title: "How We Use Your Information",
      content: (
        <div>
          <p className="mb-2">We use the information collected for the following purposes:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">To provide and personalize our dietetics, sports nutrition, and wellness coaching services.</li>
            <li className="mb-2">To communicate with you regarding consultations, appointments, diet plans, inquiries, and service updates.</li>
            <li className="mb-2">To manage your subscriptions and process payments.</li>
            <li className="mb-2">To personalize user experience and enhance Website functionality.</li>
            <li className="mb-2">To conduct research and analysis to improve our services.</li>
            <li className="mb-2">To comply with legal obligations and ensure Website security.</li>
          </ul>
        </div>
      )
    },
    {
      id: 3,
      title: "Sharing of Information",
      content: (
        <div>
          <p className="mb-2">We do not sell, rent, or trade your personal information. However, we may share information:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">With our team members and healthcare professionals within Nutridietmitra for consultation and service delivery purposes.</li>
            <li className="mb-2">With third-party service providers who assist us in Website operations, payment processing, or other business functions (under strict confidentiality agreements).</li>
            <li className="mb-2">When required by law or to protect our legal rights, or in response to a valid legal request.</li>
          </ul>
        </div>
      )
    },
    {
      id: 4,
      title: "Data Security",
      content: (
        <div>
          <p className="mb-2">We implement industry-standard security measures to protect your personal data from unauthorized access, use, or disclosure. These measures include:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Secure server infrastructure</li>
            <li className="mb-2">Encryption of sensitive data</li>
            <li className="mb-2">Regular security audits</li>
            <li className="mb-2">Access controls to limit data access to authorized personnel</li>
          </ul>
          <p>However, no online transmission or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
        </div>
      )
    },
    {
      id: 5,
      title: "Your Rights",
      content: (
        <div>
          <p className="mb-2">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2"><span className="font-semibold">Access:</span> Request access to the personal information we hold about you.</li>
            <li className="mb-2"><span className="font-semibold">Rectification:</span> Request that we correct any inaccurate or incomplete personal information.</li>
            <li className="mb-2"><span className="font-semibold">Erasure:</span> Request that we delete your personal information (subject to certain exceptions, such as legal obligations).</li>
            <li className="mb-2"><span className="font-semibold">Restriction of Processing:</span> Request that we restrict the processing of your personal information.</li>
            <li className="mb-2"><span className="font-semibold">Data Portability:</span> Request to receive your personal information in a structured, commonly used, and machine-readable format.</li>
            <li className="mb-2"><span className="font-semibold">Withdraw Consent:</span> Withdraw your consent for data processing where we rely on consent as the legal basis for processing.</li>
            <li className="mb-2"><span className="font-semibold">Complaint:</span> Lodge a complaint with the appropriate data protection authority if you have concerns about our data processing practices.</li>
          </ul>
          <p>To exercise these rights, please contact us using the contact information below.</p>
        </div>
      )
    },
    {
      id: 6,
      title: "Third-Party Links",
      content: (
        <p>Our Website may contain links to third-party websites. We are not responsible for their privacy practices and encourage you to review their privacy policies before providing any personal data.</p>
      )
    },
    {
      id: 7,
      title: "Changes to This Privacy Policy",
      content: (
        <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Changes will be posted on this page with an updated effective date. We encourage you to review this Privacy Policy regularly.</p>
      )
    },
    {
      id: 8,
      title: "Contact Us",
      content: (
        <div>
          <p className="mb-2">For any questions, concerns, or requests regarding this Privacy Policy, please contact us at:</p>
          <p className="mb-2"><span className="font-semibold">Email:</span> Nutridietmitra@gmail.com</p>
          <p><span className="font-semibold">Address:</span> OM RESIDENCY 93/B2 Mauji Colony, Malviya Nagar, Jaipur, Rajasthan, India.</p>
        </div>
      )
    }
  ];

  return (
    <div className="bg-nutricare-bg-light min-h-screen font-sans">
      {/* Changed max-w-4xl to w-full for full width on desktop */}
      <div className="w-full mx-auto p-4 md:p-10">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-nutricare-primary-dark text-white p-6">
            <h1 className="text-2xl md:text-3xl font-bold">Privacy Policy for Nutridietmitra</h1>
            <p className="mt-2 text-sm md:text-base">Effective Date: 20 March 2025</p>
          </div>
          
          {/* Introduction */}
          <div className="p-6 border-b border-gray-200">
            <p className="text-nutricare-text-dark">
              Nutridietmitra ("we," "us," or "our") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and protect your personal 
              information when you interact with our services, including through our website 
              www.nutridietmitra.com ("Website"). By using our services or our Website, 
              you agree to the terms of this Privacy Policy.
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
            <p>© 2025 Nutridietmitra. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;