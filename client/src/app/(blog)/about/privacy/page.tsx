import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
};

const privacyData = [
  {
    title: " Information We Collect",
    value:
      "We may collect personal identification information from Users in various ways, including, but not limited to, when Users visit our site, register on the site, subscribe to the newsletter, fill out a form, and in connection with other activities, services, features, or resources we make available on our Site.",
  },
  {
    title: "How We Use Collected Information",
    value:
      "cursolog may collect and use Users' personal information for the following purposes: - To improve customer service - To personalize user experience - To send periodic emails",
  },
  {
    title: "How We Protect Your Information",
    value:
      "We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our Site.",
  },
  {
    title: "Sharing Your Personal Information",
    value:
      "We do not sell, trade, or rent Users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.",
  },
  {
    title: "Changes to this Privacy Policy",
    value:
      "cursolog has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.",
  },
  {
    title: "Your Acceptance of These Terms",
    value:
      "By using this Site, you signify your acceptance of this policy. If you do not agree",
  },
];

const page = () => {
  return (
    <div className="space-y-6 pt-8 lg:px-12 sm:p-6">
      <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
      <p className="text-gray-700 leading-relaxed">
        This Privacy Policy governs the manner in which cursolog collects, uses,
        maintains, and discloses information collected from users (each, a
        "User") of the cursolog website ("Site"). This privacy policy applies to
        the Site and all products and services offered by cursolog.
      </p>
      <div className="space-y-6">
        {privacyData.map((value, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold text-gray-800">
              {index + 1}. {value.title}
            </h2>
            <p className="text-gray-600 leading-relaxed mt-2">{value.value}</p>
          </div>
        ))}
      </div>
      <div className="h-16" /> {/* Adjusted for consistent spacing */}
    </div>
  );
};

export default page;
