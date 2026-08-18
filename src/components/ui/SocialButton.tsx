import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

export interface SocialButtonProps {
  type: 'email' | 'github' | 'linkedin';
  href?: string;
  className?: string;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  type,
  href,
  className = '',
}) => {
  const defaultLinks = {
    email: 'mailto:rajayush0852@gmail.com',
    github: 'https://github.com/ThakurAyushRaj',
    linkedin: 'https://linkedin.com/in/thakur-ayush-raj',
  };

  const targetHref = href || defaultLinks[type];
  const isMail = type === 'email';

  const getIcon = () => {
    switch (type) {
      case 'email':
        return <Mail className="w-5 h-5 text-white" />;
      case 'github':
        return <Github className="w-5 h-5 text-white" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5 text-white" />;
    }
  };

  const getLabel = () => {
    switch (type) {
      case 'email':
        return 'Send direct email';
      case 'github':
        return 'Ayush Raj GitHub Profile';
      case 'linkedin':
        return 'Ayush Raj LinkedIn Profile';
    }
  };

  return (
    <a
      href={targetHref}
      target={isMail ? '_self' : '_blank'}
      rel={isMail ? undefined : 'noreferrer'}
      className={`Btn ${className}`}
      aria-label={getLabel()}
      title={getLabel()}
    >
      <div className={`BG bg-${type}`} />
      <div className="svgContainer">
        {getIcon()}
      </div>
    </a>
  );
};

export const SocialLinksGroup: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <SocialButton type="email" />
      <SocialButton type="github" />
      <SocialButton type="linkedin" />
    </div>
  );
};
