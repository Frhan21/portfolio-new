import { useEffect, useMemo, useState } from "react";

export const useTypeWriter = () => {
    const [displayText, setDisplayText] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(200);

    const jobTitles = useMemo(() => [
        "Web Developer",
        "Full Stack Developer",
        "UI/UX Designer",
        "Machine Learning Engineer", 
        "Social Media Designer"
    ], [])

    useEffect(() => {
        const i = loopNum % jobTitles.length;
        const jobTitle = jobTitles[i];

        const article  = /^[aiueo]/i.test(jobTitle.charAt(0)) ? "an" : "a";
        const fullText = `${article} ${jobTitle}`;
        const handleTyping = () => {
            setDisplayText(
                isDeleting ? fullText.substring(0, displayText.length - 1) : fullText.substring(0, displayText.length + 1)
            )

            setTypingSpeed(isDeleting ? 30 : 200);
            
            if (!isDeleting && displayText === fullText) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && displayText === "") {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);

                setTypingSpeed(500);
            }
        }

        const cursorInterval = setInterval(() => {
            setCursorVisible((prev) => !prev);
        }, 500); 

        const typingInterval = setTimeout(handleTyping, typingSpeed);
        return () => {
            clearTimeout(typingInterval);
            clearInterval(cursorInterval);
        }
    }, [displayText, typingSpeed, isDeleting, loopNum, jobTitles]);

    return {typeWriterText: displayText, cursorVisible}
}