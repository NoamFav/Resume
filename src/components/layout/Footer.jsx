import { Link } from "react-router-dom";
import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaCode,
    FaEnvelope,
    FaGlobe,
} from "react-icons/fa";

const SOCIAL_ICONS = {
    website: FaGlobe,
    github: FaGithub,
    linkedin: FaLinkedin,
    instagram: FaInstagram,
    leetcode: FaCode,
};

const SITE_LINKS = [
    { to: "/projects", label: "Projects" },
    { to: "/skills", label: "Skills" },
    { to: "/languages", label: "Languages" },
    { to: "/frameworks", label: "Frameworks" },
    { to: "/tools", label: "Tools" },
];

export default function Footer({ contact }) {
    const contactInfo = contact?.contact;
    const social = contact?.social || {};

    return (
        <footer id="contact" className="border-t border-zinc-900 py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div className="md:col-span-2 space-y-4">
                        <span className="font-semibold text-lg text-white">
                            Noam Favier
                        </span>
                        <p className="text-zinc-400 text-sm max-w-md">
                            Software engineer building systems tools, AI-driven
                            applications, and interactive experiences. Open to
                            freelance work and new opportunities.
                        </p>
                        {contactInfo && (
                            <div className="space-y-2 pt-2 text-sm text-zinc-400">
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="flex items-center gap-2 hover:text-white transition-colors w-fit"
                                >
                                    <FaEnvelope className="h-3.5 w-3.5" />
                                    {contactInfo.email}
                                </a>
                            </div>
                        )}
                        <div className="flex items-center gap-4 pt-2">
                            {Object.entries(social).map(([platform, url]) => {
                                const Icon = SOCIAL_ICONS[platform];
                                if (!Icon || !url) return null;
                                return (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-zinc-400 hover:text-white transition-colors"
                                        aria-label={platform}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4 text-sm">
                            Explore
                        </h3>
                        <ul className="space-y-2.5">
                            {SITE_LINKS.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-zinc-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-zinc-600">
                        © {new Date().getFullYear()} Noam Favier. All rights
                        reserved.
                    </p>
                    {contactInfo?.address && (
                        <p className="text-xs text-zinc-600">
                            {contactInfo.address}
                        </p>
                    )}
                </div>
            </div>
        </footer>
    );
}
