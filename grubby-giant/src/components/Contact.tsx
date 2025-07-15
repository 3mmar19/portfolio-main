// Copied from original Next.js project

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import React from 'react';
import emailjs from '@emailjs/browser';
import SectionTitle from './SectionTitle';

/**
 * Type definition for form errors
 */
type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

/**
 * Contact Component
 * 
 * A comprehensive contact section with social links and contact form.
 * Features:
 * - Interactive social media links with hover effects
 * - Animated contact form with validation
 * - Success/error message handling
 * - Theme-aware styling
 */
 function Contact() {
  const { theme } = useTheme();
  
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<FormErrors>({});

  // Form reference for emailjs
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize emailjs
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!publicKey) {
      console.error('EmailJS public key is not set');
      return;
    }
    emailjs.init(publicKey);
  }, []);

  /**
   * Validates the form data
   * Returns true if the form is valid, false otherwise
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form input changes
   * Updates form state while maintaining immutability
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldMap: { [key: string]: string } = {
      'user_name': 'name',
      'user_email': 'email',
      'message': 'message'
    };

    setFormData(prev => ({
      ...prev,
      [fieldMap[name] || name]: value
    }));

    // Clear error when user starts typing
    if (errors[fieldMap[name] as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [fieldMap[name]]: undefined
      }));
    }
  };

  /**
   * Handles form submission
   * Validates inputs and processes the form data
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS configuration is incomplete');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      );

      if (result.text === 'OK') {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input classes for styling
  const inputClasses = `w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
    theme === 'dark'
      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
  } focus:outline-none focus:ring-2 focus:ring-blue-500`;

  // Error classes for styling
  const errorClasses = "text-red-500 text-sm mt-1";

  return (
    <section id="contact" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <SectionTitle 
          title="Contact" 
          fromColor="from-emerald-400"
          toColor="to-sky-400"
        />

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              I&apos;m always interested in hearing about new projects and opportunities.
              Feel free to reach out!
            </p>

            <div className="space-y-4">
              <a
                href="mailto:ammarhus.ahmed@gmail.com"
                className={`flex items-center space-x-3 group ${
                  theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <svg
                  className={`w-5 h-5 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="transition-colors duration-300">ammarhus.ahmed@gmail.com</span>
              </a>

              <a
                href="tel:+966 53 567 6369"
                className={`flex items-center space-x-3 group ${
                  theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <svg
                  className={`w-5 h-5 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="transition-colors duration-300">+966 53 567 6369</span>
              </a>

              <div className={`flex items-center space-x-3 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <svg
                  className={`w-5 h-5 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Makkah, Saudi Arabia</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            ref={formRef}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <input
                type="text"
                name="user_name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={`${inputClasses} ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                disabled={isSubmitting}
                required
              />
              {errors.name && <p className={errorClasses}>{errors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                name="user_email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`${inputClasses} ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                disabled={isSubmitting}
                required
              />
              {errors.email && <p className={errorClasses}>{errors.email}</p>}
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`${inputClasses} ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
                disabled={isSubmitting}
                required
              />
              {errors.message && <p className={errorClasses}>{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-all duration-300 relative ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              <span className={`${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                Send Message
              </span>
              {isSubmitting && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </motion.div>
              )}
            </button>

            <AnimatePresence mode="wait">
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg p-3 text-center"
                >
                  Message sent successfully! I&apos;ll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-3 text-center"
                >
                  Failed to send message. Please try again or email me directly.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-center mt-12 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Feel free to reach out! I&apos;m always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default Contact;
