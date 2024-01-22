function Footer() {
  return (
    <footer className="text-white py-4 text-center mt-16 sm:mt-48 w-72">
      <div className="container mx-auto">
        <p className="font-raleway">
          &copy; 2024 Big Brain Weather Plays. All Rights Reserved.
        </p>
        <p className="mt-10">
          <a href="/contact-us">Contact Us</a>
          {" | "}
          <a
            href="https://www.buymeacoffee.com/bigbrainweatherplays"
            target="_blank"
            rel="noopener noreferrer"
            title="Welcome to Big Brain Weather Plays, your trusted source for invaluable weather insights in the world of fantasy sports and betting. Our mission is to enhance your sports-related decisions with accurate weather data, and we do it all for free! We invite you to support us on Buy Me a Coffee to help us continue providing this exceptional service."
          >
            Buy Me a Coffee
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
