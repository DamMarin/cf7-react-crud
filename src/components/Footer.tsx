const Footer = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <>
      <footer className="bg-cf-dark-gray text-white">
        <div className="container mx-auto py-8 text-center">
          &copy; {currentYear} Coding Factory 7. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
