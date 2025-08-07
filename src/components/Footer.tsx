export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-2 mt-auto">
      <div className="container mx-auto px-2 flex flex-col md:flex-row items-center justify-center">
        <p className="text-sm leading-5">&copy; {new Date().getFullYear()} Phong APP. All rights reserved.</p>
      </div>
    </footer>
  );
}
