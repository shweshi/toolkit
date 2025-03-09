import { Github, Code, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 pt-8 border-t border-white/10">
      <div className="flex justify-center">
        <a
          href="https://github.com/shweshi" // Replace with your GitHub URL
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-200 transition mr-2"
        >
          <Code size={24} />
        </a>
        <a
          href="https://github.com/shweshi" // Replace with your GitHub URL
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-200 transition mr-2"
        >
          <Github size={24} />
        </a>
        <a
          href="https://github.com/shweshi" // Replace with your GitHub URL
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-200 transition"
        >
          <Heart size={24} />
        </a>

      </div>
    </footer>
  );
}
