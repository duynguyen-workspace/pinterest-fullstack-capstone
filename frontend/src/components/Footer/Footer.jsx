const Footer = () => {
    return (
        <footer className="bg-red-600 p-1 dark:bg-gray-800">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-center">
                <p className="text-sm text-white sm:text-center dark:text-gray-400">
                    © 2023{" "}
                    <span className="hover:underline">
                        Pinterest™
                    </span>
                    . All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
