import axios from "axios";


interface IReplicateAPI {
    generateImage: (prompt: string) => Promise<{audio: string}>;
    generateVideo: (prompt: string) => Promise<any>;
}

const ReplicateAPI: IReplicateAPI = {
    generateImage: async (prompt) => {
        const res = await axios.post("/api/music", { prompt });
        return res.data;
    },
    generateVideo: async (prompt) => {
        const res = await axios.post("/api/video", { prompt });
        return res.data;
    }
}

export default ReplicateAPI;
