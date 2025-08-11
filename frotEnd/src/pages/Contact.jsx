const Contact = () => {
  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold text-red-600 mb-6">Contact Us</h1>
      <form className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Your Name" />
        <input className="w-full p-2 border rounded" placeholder="Your Email" />
        <textarea className="w-full p-2 border rounded h-32" placeholder="Message" />
        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
