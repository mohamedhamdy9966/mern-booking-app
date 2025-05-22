const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          HALLA Travel
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <a className="cursor-pointer">Privacy Policy</a>
          <a className="cursor-pointer">Terms of service</a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
