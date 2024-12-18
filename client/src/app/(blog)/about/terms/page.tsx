import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and conditions",
};

const termsData = [
  {
    title: "Acceptance of Terms",
    value:
      "By using cursolog, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. If you do not agree to these terms, please refrain from using our services.",
  },
  {
    title: "User Responsibilities",
    value:
      "Users of cursolog are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. Users agree to notify us immediately of any unauthorized use of their account or any other breach of security.",
  },
  {
    title: "Content",
    value:
      "cursolog provides educational content for informational purposes. While we strive for accuracy, we do not guarantee the completeness, reliability, or accuracy of the content. The use of any information on our website is at your own risk.",
  },
  {
    title: "Intellectual Property",
    value:
      "The content, logos, trademarks, and other intellectual property on cursolog are the property of cursolog. Users may not use, reproduce, or distribute any content from the website without our prior written permission.",
  },
  {
    title: "Privacy",
    value:
      "Our Privacy Policy outlines how we collect, use, and protect your personal information. By using cursolog, you agree to the terms outlined in our Privacy Policy.",
  },
  {
    title: "Modifications",
    value:
      "cursolog reserves the right to modify or terminate any part of the website or services at any time. We may also update these terms and conditions without notice. Users are responsible for regularly reviewing the most current version of the terms.",
  },
  {
    title: "Governing Law",
    value:
      "These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes or claims arising out of or in connection with the use of cursolog will be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].",
  },
  {
    title: "Contact Information",
    value:
      "If you have any questions or concerns about these terms and conditions, please contact us at [Your Contact Email]. We value your feedback and are committed to addressing any issues promptly.",
  },
  {
    title: "Changes to Terms",
    value:
      "cursolog reserves the right to update or change these terms and conditions at any time without prior notice. Continued use of the website after any modifications constitutes acceptance of the updated terms and conditions. It is the user's responsibility to check for changes periodically.",
  },
  {
    title: "Termination",
    value:
      "We may terminate or suspend access to cursolog immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach these terms and conditions. All provisions of these terms and conditions shall survive termination, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.",
  },
  {
    title: "Entire Agreement",
    value:
      "These terms and conditions constitute the entire agreement between you and cursolog, governing your use of the website, and supersede all prior agreements and understandings. Any failure by us to exercise or enforce any right or provision of these terms shall not constitute a waiver of such right or provision.",
  },
];

const page = () => {
  return (
    <div className=" space-y-5 py-4">
      <h1 className="h2-semibold">Terms and Conditions</h1>

      <p className="text-gray-600">
        Welcome to cursolog! By accessing and using our website, you agree to
        comply with and be bound by the following terms and conditions. If you
        disagree with any part of these terms, please do not use our website.
      </p>
      <div className=" space-y-4">
        {termsData?.map((value, index) => (
          <div key={index}>
            <h2 className="h5-bold">
              {index + 1}. {value.title}
            </h2>
            <p className="text-gray-600 pt-2">{value.value}</p>
          </div>
        ))}
      </div>

      <div className="h-40" />
    </div>
  );
};

export default page;
