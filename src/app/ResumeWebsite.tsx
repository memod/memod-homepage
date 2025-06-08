'use client'
import React, { useEffect, useState } from "react";
import axios, {AxiosResponse} from 'axios';

interface MediumPost {
    title: string;
    link: string;
    pubDate: string;
}

const fetchMediumPosts = async (): Promise<MediumPost[]> => {
    try {
        const url: string = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@guillermo.durazo';
        const result = await axios.get(url)
            .then((response: AxiosResponse) => {
                if (response.status != 200) {
                    return [];
                }
                const posts: MediumPost[] = response.data.items.map((item: MediumPost) => ({
                    title: item.title,
                    link: item.link,
                    pubDate: item.pubDate,
                }));
                return posts.slice(0, 5); // Limit to the latest 5 posts
            })
            .catch(() => {
                console.error("Not able to get blog posts.")
                return [];
            });
        return result;
    } catch (error) {
        console.error('Error fetching Medium posts:', error);
        return [];
    }
};


type Theme = "light" | "dark";

const contact = {
    email: "guillermo.durazo@gmail.com",
    linkedin: "linkedin.com/in/carlos-g-durazo",
    github: "github.com/memod",
    medium: "blog.carlosdurazo.dev"
}

const ResumeWebsite: React.FC = () => {
    const [theme, setTheme] = useState<Theme>("light");
    const [mediumPosts, setMediumPosts] = useState<MediumPost[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    // Initialize theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    // Simulate fetching Medium posts
    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                fetchMediumPosts().then((posts) => {
                    setMediumPosts(posts);
                });
                setError(null);
            } catch {
                setError("Failed to load articles");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <div className={`min-h-screen ${theme === "light" ? "bg-gray-100 text-black" : "bg-gray-800 text-gray-100"}`}>
            <header className="p-6 flex justify-between items-center bg-blue-500 text-white">
                <div>
                    <h1>Carlos G Durazo</h1>
                    <p>Senior Software Engineer</p>
                </div>
                <button onClick={toggleTheme} className="p-2 bg-gray-700 text-white rounded">
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>
            </header>
            <main className="p-6 max-w-3xl mx-auto">
                <section className="mb-6">
                    <h2 className="text-lg font-bold">Quick Highlights</h2>
                    <ul className="list-disc pl-6">
                        <li>10+ years in software engineering as a full-stack engineer</li>
                        <li>Experience with Python, Java, React and SQL</li>
                        <li>Passionate about mentorship and code quality</li>
                    </ul>
                </section>
                <section className="mb-6">
                    <h2 className="text-lg font-bold">Latest Articles</h2>
                    {isLoading ? (
                        <p>Loading articles...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <ul>
                            {mediumPosts?.map((post: MediumPost, index: number) => (
                                <li key={index} className="mb-4">
                                    <a href={post.link} target="_blank" rel="noreferrer"
                                       className="text-blue-500 hover:underline">
                                        {post.title}
                                    </a>
                                    <p className="text-sm">{post.title}</p>
                                    <p className="text-xs text-gray-400">{post.pubDate}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
                <section>
                    <a href="/Resume%20-%20Carlos%20Durazo.pdf"
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Download Resume
                    </a>
                </section>
            </main>
            <footer className="p-6 text-center">
                <p>Contact: <a href={`mailto:${contact.email}`}
                               className="hover:underline text-blue-500">{contact.email}</a></p>
                <p>GitHub: <a href={`https://${contact.github}`} target="_blank" rel="noreferrer"
                              className="hover:underline text-blue-500">{contact.github}</a></p>
                <p>LinkedIn: <a href={`https://${contact.linkedin}`} target="_blank" rel="noreferrer"
                                className="hover:underline text-blue-500">{contact.linkedin}</a></p>
                <p>Medium: <a href={`https://${contact.medium}`} target="_blank" rel="noreferrer"
                                className="hover:underline text-blue-500">{contact.medium}</a></p>
            </footer>
        </div>
    );
};

export default ResumeWebsite;
