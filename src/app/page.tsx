'use client';
import React, { useState } from 'react';

interface Pair {
    giver: string;
    receiver: string | null;
}

const Home: React.FC = () => {
    const [maleCharacters] = useState<string[]>(['Sebas', 'JuanMan', 'Julian', 'Wilfran', 'Pedro', 'Jhon', 'Andres', 'Rodri']);

    const [femaleCharacters] = useState<string[]>(['Yohanna', 'Wendy', 'Aleja', 'Erika']);
    const [pairs, setPairs] = useState<Pair[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const shuffleArray = <T,>(array: T[]): T[] => {
        return array.sort(() => Math.random() - 0.5);
    };

    const generatePairs = () => {
        setLoading(true);
        setTimeout(() => {
            const shuffledMales = shuffleArray([...maleCharacters]);
            let shuffledFemales = shuffleArray([...femaleCharacters]);

            const allParticipants = shuffleArray([...shuffledMales, ...shuffledFemales]);
            let remainingParticipants = [...shuffledMales];

            const newPairs: Pair[] = [];

            for (let i = 0; i < allParticipants.length; i++) {
                const giver = allParticipants[i];
                let receiver: string | null = null;

                if (femaleCharacters.includes(giver)) {
                    const availableMales = remainingParticipants.filter((male) => male !== giver);
                    receiver = availableMales.pop() || null;
                    remainingParticipants = remainingParticipants.filter((male) => male !== receiver);
                } else {
                    const availableReceivers = remainingParticipants.concat(shuffledFemales).filter((person) => person !== giver);
                    receiver = availableReceivers.pop() || null;
                    remainingParticipants = remainingParticipants.filter((person) => person !== receiver);
                    shuffledFemales = shuffledFemales.filter((person) => person !== receiver);
                }

                newPairs.push({ giver, receiver });
            }

            setPairs(newPairs);
            setLoading(false);
        }, 3000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="md:text-4xl text-2xl font-bold text-blue-600 mb-6">Sorteo de Amigo Secreto</h1>

            <button onClick={generatePairs} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6">
                Descubre quien es tu amigo secreto!
            </button>

            {loading && (
                <div className="text-center flex flex-col items-center justify-center text-lg text-gray-700">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    ¡Realizando sorteo!
                </div>
            )}

            {!loading && pairs.length > 0 && (
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resultados del Sorteo:</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {pairs.map((pair, index) => (
                            <li key={index} className="text-lg text-gray-700">
                                <span className="pr-2 rounded">
                                    <strong>{pair.giver}:</strong>
                                </span>
                                tu amigo secreto es
                                <span className="pl-1 rounded">
                                    <strong>{pair.receiver}</strong>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Home;
