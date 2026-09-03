import React, { useState, useId } from 'react';
import { Mail, Send, Check, Copy, MapPin, Phone } from 'lucide-react';
import { SocialButton, SocialLinksGroup } from '@/components/ui/SocialButton';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const nameId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();

  const directEmail = 'rajayush226@gmail.com';
  const directPhone = '+91 91358 31645';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(directPhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message content is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 border-t border-zinc-900/80 relative">
      {/* Ambient background light */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[300px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 backdrop-blur-md">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>Direct Technical Communication</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Let's Build <span className="text-gradient-blue">Together</span>
          </h2>
          <p className="text-zinc-300 max-w-2xl text-base leading-relaxed">
            Open for Software Development Engineer (SDE) positions, full-stack enterprise platform inquiries, and technical engineering roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-zinc-700/60 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-bold font-display text-white">Contact Information</h3>
                {/* Rotating Gradient Social Buttons in Card Header */}
                <SocialLinksGroup />
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Reach out directly via email, phone, GitHub, LinkedIn, or the contact terminal. I typically respond within 24 hours.
              </p>

              <div className="space-y-4 pt-2">
                {/* Email Item with Copy */}
                <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800 flex items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-3.5 overflow-hidden">
                    <div style={{ transform: 'scale(0.9)', transformOrigin: 'left center' }}>
                      <SocialButton type="email" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-mono text-zinc-400">Direct Email</div>
                      <div className="text-sm font-mono text-white truncate font-semibold">{directEmail}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-zinc-200 hover:text-white border border-zinc-700 transition-all flex items-center gap-1.5 flex-shrink-0 min-h-[40px]"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Phone Item */}
                <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800 flex items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-3.5 overflow-hidden">
                    <div className="Btn cursor-default flex-shrink-0" style={{ transform: 'scale(0.9)', transformOrigin: 'left center' }}>
                      <div className="BG bg-phone" />
                      <div className="svgContainer">
                        <Phone className="w-5 h-5 text-zinc-800 dark:text-white" />
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-mono text-zinc-400">Phone / WhatsApp</div>
                      <a href={`tel:${directPhone.replace(/\s+/g, '')}`} className="text-sm font-mono text-white font-semibold hover:text-blue-400 transition-colors">
                        {directPhone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-zinc-200 hover:text-white border border-zinc-700 transition-all flex items-center gap-1.5 flex-shrink-0 min-h-[40px]"
                    aria-label="Copy phone number"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Location Item */}
                <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800 flex items-center gap-3.5 shadow-sm">
                  <div className="Btn cursor-default flex-shrink-0" style={{ transform: 'scale(0.9)', transformOrigin: 'left center' }}>
                    <div className="BG bg-location" />
                    <div className="svgContainer">
                      <MapPin className="w-5 h-5 text-zinc-800 dark:text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-zinc-400">Location</div>
                    <div className="text-sm font-medium text-white">Greater Noida, Uttar Pradesh, India</div>
                  </div>
                </div>

                {/* GitHub Item */}
                <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800 flex items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-3.5 overflow-hidden">
                    <div style={{ transform: 'scale(0.9)', transformOrigin: 'left center' }}>
                      <SocialButton type="github" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-zinc-400">GitHub Profile</div>
                      <a
                        href="https://github.com/ThakurAyushRaj"
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-white hover:text-cyan-400 transition-colors"
                      >
                        github.com/ThakurAyushRaj
                      </a>
                    </div>
                  </div>
                </div>

                {/* LinkedIn Item */}
                <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800 flex items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-3.5 overflow-hidden">
                    <div style={{ transform: 'scale(0.9)', transformOrigin: 'left center' }}>
                      <SocialButton type="linkedin" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-zinc-400">LinkedIn Profile</div>
                      <a
                        href="https://www.linkedin.com/in/ayush-raj-8348a9260"
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-white hover:text-cyan-400 transition-colors"
                      >
                        linkedin.com/in/ayush-raj-8348a9260
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cyber Glitch Form Container */}
          <div className="lg:col-span-7">
            <div className="glitch-form-wrapper">
              <div className="glitch-card">
                {/* Header bar */}
                <div className="glitch-card-header">
                  <div className="glitch-card-title">
                    <Send className="w-4 h-4 text-[#00f2ea]" />
                    <span>Direct Terminal Uplink</span>
                  </div>
                  <div className="glitch-card-dots">
                    <span className="bg-[#ff5f56]" />
                    <span className="bg-[#ffbd2e]" />
                    <span className="bg-[#27c93f]" />
                  </div>
                </div>

                <div className="glitch-card-body p-6 sm:p-8">
                  {isSubmitted ? (
                    <div className="py-10 text-center space-y-4 animate-in fade-in zoom-in-95">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                        <Check className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold font-display text-white">Transmission Successful</h3>
                      <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed font-mono">
                        Your message has been encrypted and dispatched to my inbox. I will reply promptly.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-4 px-6 py-3 rounded-xl bg-zinc-900 border border-cyan-500/30 hover:border-cyan-400 text-[#00f2ea] text-xs font-mono transition-all min-h-[44px]"
                      >
                        Send Another Transmission
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                      <div className="border-b border-cyan-500/20 pb-3 mb-6">
                        <h3 className="text-xl font-bold font-display text-white tracking-wide uppercase">
                          Send a Direct Message
                        </h3>
                        <p className="text-xs font-mono text-zinc-400 mt-1">
                          Encrypted communication channel with Ayush Raj
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name Field - eslam-hany Cyber Input */}
                        <div>
                          <div className="eslam-input-container">
                            <input
                              id={nameId}
                              name="name"
                              type="text"
                              placeholder="Your Full Name *"
                              value={formData.name}
                              onChange={e => setFormData({ ...formData, name: e.target.value })}
                              className="eslam-input"
                              required
                            />
                            <span className="eslam-topline" />
                            <span className="eslam-underline" />
                            <label htmlFor={nameId} className="eslam-label">
                              Your Full Name *
                            </label>
                          </div>
                          {errors.name && (
                            <p role="alert" className="text-xs text-red-400 font-mono pl-1 pt-1">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        {/* Email Field - eslam-hany Cyber Input */}
                        <div>
                          <div className="eslam-input-container">
                            <input
                              id={emailId}
                              name="email"
                              type="email"
                              placeholder="Email Address *"
                              value={formData.email}
                              onChange={e => setFormData({ ...formData, email: e.target.value })}
                              className="eslam-input"
                              required
                            />
                            <span className="eslam-topline" />
                            <span className="eslam-underline" />
                            <label htmlFor={emailId} className="eslam-label">
                              Email Address *
                            </label>
                          </div>
                          {errors.email && (
                            <p role="alert" className="text-xs text-red-400 font-mono pl-1 pt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Subject Field - eslam-hany Cyber Input */}
                      <div>
                        <div className="eslam-input-container">
                          <input
                            id={subjectId}
                            name="subject"
                            type="text"
                            placeholder="Subject / Purpose *"
                            value={formData.subject}
                            onChange={e => setFormData({ ...formData, subject: e.target.value })}
                            className="eslam-input"
                            required
                          />
                          <span className="eslam-topline" />
                          <span className="eslam-underline" />
                          <label htmlFor={subjectId} className="eslam-label">
                            Subject / Purpose *
                          </label>
                        </div>
                        {errors.subject && (
                          <p role="alert" className="text-xs text-red-400 font-mono pl-1 pt-1">
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      {/* Message Field - eslam-hany Cyber Textarea */}
                      <div>
                        <div className="eslam-input-container">
                          <textarea
                            id={messageId}
                            name="message"
                            rows={4}
                            placeholder="Message / Details *"
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                            className="eslam-input eslam-textarea"
                            required
                          />
                          <span className="eslam-topline" />
                          <span className="eslam-underline" />
                          <label htmlFor={messageId} className="eslam-label">
                            Message / Details *
                          </label>
                        </div>
                        {errors.message && (
                          <p role="alert" className="text-xs text-red-400 font-mono pl-1 pt-1">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Glitch Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="glitch-submit-btn"
                        data-text={isSubmitting ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}
                      >
                        <span className="btn-text">
                          {isSubmitting ? 'Transmitting Message...' : 'Transmit Message'}
                        </span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
