import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post("https://test-project-26ku.onrender.com/contact", data);
      toast.success("Message sent successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      reset();
      setSubmitStatus({
        type: "success",
        message: "Message sent successfully!",
      });
    } catch (e) {
      if (e)
        toast.error("Failed to send message. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
            <span className="block text-indigo-600 font-semibold mb-4">
              Contact Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase text-black dark:text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We're here to help! Reach out with any questions or feedback, and
              we'll get back to you promptly.
            </p>
            <ContactInfo
              icon={<LocationIcon />}
              title="Our Location"
              content="99 S.t Jomblo Park Pekanbaru 28292, Indonesia"
            />
            <ContactInfo
              icon={<PhoneIcon />}
              title="Phone Number"
              content="(+62)81 414 257 9980"
            />
            <ContactInfo
              icon={<EmailIcon />}
              title="Email Address"
              content="info@yourdomain.com"
            />
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <ContactInputBox
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  register={register}
                  error={errors.name}
                  validation={{
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  }}
                />
                <ContactInputBox
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  register={register}
                  error={errors.email}
                  validation={{
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  }}
                />
                <ContactInputBox
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  register={register}
                  error={errors.phone}
                  validation={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+?[\d\s-]{10,}$/,
                      message: "Invalid phone number",
                    },
                  }}
                />
                <ContactTextArea
                  name="message"
                  placeholder="Your Message"
                  register={register}
                  error={errors.message}
                  validation={{
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  }}
                />
                {submitStatus && (
                  <div
                    className={`mb-4 text-sm ${
                      submitStatus.type === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 transition-all duration-300"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
              <DecorativeElements />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

const ContactInfo = ({ icon, title, content }) => (
  <div className="flex mb-6 max-w-sm">
    <div className="flex items-center justify-center w-16 h-16 rounded bg-indigo-600/10 text-indigo-600 mr-4">
      {icon}
    </div>
    <div>
      <h4 className="text-xl font-bold text-black dark:text-white mb-1">
        {title}
      </h4>
      <p className="text-gray-600 dark:text-gray-300">{content}</p>
    </div>
  </div>
);

const ContactInputBox = ({
  type,
  name,
  placeholder,
  register,
  error,
  validation,
}) => (
  <div className="mb-6">
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, validation)}
      className={`w-full rounded border px-4 py-3 text-gray-600 dark:text-gray-300 dark:bg-gray-700 outline-none transition-colors duration-200 ${
        error
          ? "border-red-500 focus:border-red-500"
          : "border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400"
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
  </div>
);

const ContactTextArea = ({
  name,
  placeholder,
  register,
  error,
  validation,
}) => (
  <div className="mb-6">
    <textarea
      rows={6}
      placeholder={placeholder}
      {...register(name, validation)}
      className={`w-full resize-none rounded border px-4 py-3 text-gray-600 dark:text-gray-300 dark:bg-gray-700 outline-none transition-colors duration-200 ${
        error
          ? "border-red-500 focus:border-red-500"
          : "border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400"
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
  </div>
);

const LocationIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30.6 11.8002L17.7 3.5002C16.65 2.8502 15.3 2.8502 14.3 3.5002L1.39998 11.8002C0.899983 12.1502 0.749983 12.8502 1.04998 13.3502C1.39998 13.8502 2.09998 14.0002 2.59998 13.7002L3.44998 13.1502V25.8002C3.44998 27.5502 4.84998 28.9502 6.59998 28.9502H25.4C27.15 28.9502 28.55 27.5502 28.55 25.8002V13.1502L29.4 13.7002C29.6 13.8002 29.8 13.9002 30 13.9002C30.35 13.9002 30.75 13.7002 30.95 13.4002C31.3 12.8502 31.15 12.1502 30.6 11.8002ZM13.35 26.7502V18.5002C13.35 18.0002 13.75 17.6002 14.25 17.6002H17.75C18.25 17.6002 18.65 18.0002 18.65 18.5002V26.7502H13.35ZM26.3 25.8002C26.3 26.3002 25.9 26.7002 25.4 26.7002H20.9V18.5002C20.9 16.8002 19.5 15.4002 17.8 15.4002H14.3C12.6 15.4002 11.2 16.8002 11.2 18.5002V26.7502H6.69998C6.19998 26.7502 5.79998 26.3502 5.79998 25.8502V11.7002L15.5 5.4002C15.8 5.2002 16.2 5.2002 16.5 5.4002L26.3 11.7002V25.8002Z"
      fill="currentColor"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.3 31.1499C22.95 31.1499 21.4 30.7999 19.7 30.1499C16.3 28.7999 12.55 26.1999 9.19997 22.8499C5.84997 19.4999 3.24997 15.7499 1.89997 12.2999C0.39997 8.59994 0.54997 5.54994 2.29997 3.84994C2.34997 3.79994 2.44997 3.74994 2.49997 3.69994L6.69997 1.19994C7.74997 0.599942 9.09997 0.899942 9.79997 1.89994L12.75 6.29994C13.45 7.34994 13.15 8.74994 12.15 9.44994L10.35 10.6999C11.65 12.7999 15.35 17.9499 21.25 21.6499L22.35 20.0499C23.2 18.8499 24.55 18.4999 25.65 19.2499L30.05 22.1999C31.05 22.8999 31.35 24.2499 30.75 25.2999L28.25 29.4999C28.2 29.5999 28.15 29.6499 28.1 29.6999C27.2 30.6499 25.9 31.1499 24.3 31.1499Z"
      fill="currentColor"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28 4.7998H3.99998C2.29998 4.7998 0.849976 6.1998 0.849976 7.9498V24.1498C0.849976 25.8498 2.24998 27.2998 3.99998 27.2998H28C29.7 27.2998 31.15 25.8998 31.15 24.1498V7.8998C31.15 6.1998 29.7 4.7998 28 4.7998ZM28 7.0498C28.05 7.0498 28.1 7.0498 28.15 7.0498L16 14.8498L3.84998 7.0498C3.89998 7.0498 3.94998 7.0498 3.99998 7.0498H28ZM28 24.9498H3.99998C3.49998 24.9498 3.09998 24.5498 3.09998 24.0498V9.2498L14.8 16.7498C15.15 16.9998 15.55 17.0998 15.95 17.0998C16.35 17.0998 16.75 16.9998 17.1 16.7498L28.8 9.2498V24.0998C28.9 24.5998 28.5 24.9498 28 24.9498Z"
      fill="currentColor"
    />
  </svg>
);

const DecorativeElements = () => (
  <>
    <span className="absolute -right-9 -top-10 z-[-1]">
      <svg
        width={75}
        height={75}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
          fill="#3056D3"
        />
      </svg>
    </span>
    <span className="absolute -bottom-7 -left-7 z-[-1]">
      <svg
        width={80}
        height={100}
        viewBox="0 0 107 134"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="104.999"
          cy={132}
          r="1.66667"
          transform="rotate(180 104.999 132)"
          fill="#13C296"
        />
        <circle
          cx="104.999"
          cy="117.333"
          r="1.66667"
          transform="rotate(180 104.999 117.333)"
          fill="#13C296"
        />
        <circle
          cx="104.999"
          cy="102.667"
          r="1.66667"
          transform="rotate(180 104.999 102.667)"
          fill="#13C296"
        />
        <circle
          cx="104.999"
          cy={88}
          r="1.66667"
          transform="rotate(180 104.999 88)"
          fill="#13C296"
        />
        <circle
          cx="104.999"
          cy="73.3333"
          r="1.66667"
          transform="rotate(180 104.999 73.3333)"
          fill="#13C296"
        />
      </svg>
    </span>
  </>
);

export default ContactUs;
