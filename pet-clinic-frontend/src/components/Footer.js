
export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-4 mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; {new Date().getFullYear()} Pet Clinic. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="/about" className="hover:text-blue-300">About</a>
              <a href="/contact" className="hover:text-blue-300">Contact</a>
              <a href="/privacy" className="hover:text-blue-300">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    );
}
  