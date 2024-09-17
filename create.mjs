import {
    faker
} from "@faker-js/faker";
import fs from 'fs/promises';
import path from 'path';

const getPrompt = (type) => faker.helpers.fake(`profile picture of a {{number.int({"min":18, "max":70})}}-year-old ${type} from {{location.country}}`);
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});
async function generateAndSaveImage(prompt, outputFolder) {
    try {
        try {
            await fs.mkdir(outputFolder, {
                recursive: true
            });
        } catch (error) {
            //console.error("Error creating output folder:", error);
        }
        const input = {
            cfg: 3.5,
            steps: 28,
            prompt,
            aspect_ratio: "1:1",
            output_format: "jpg",
            output_quality: 90,
            negative_prompt: "",
            prompt_strength: 0.85
        };

        const output = await replicate.run("stability-ai/stable-diffusion-3", {
            input
        });
        console.log(output);

        const imageUrl = output[0]
        const imageResponse = await fetch(imageUrl);
        const arrayBuffer = await imageResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        let fileName;
        let fileIndex = 1;
        do {
            fileName = `${fileIndex}.jpg`;
            fileIndex++;
        } while (await fs.access(path.join(outputFolder, fileName)).then(() => true).catch(() => false));
        await fs.writeFile(path.join(outputFolder, fileName), buffer);

        console.log(`Image saved: ${fileName}`);
    } catch (error) {
        console.error("Error generating or saving image:", error);
    }
}

async function main() {


    for (let i = 0; i < 100; i++) {
        const prompt1 = getPrompt("man");
        console.log(`Generating image for prompt: ${prompt1}`);
        await generateAndSaveImage(prompt1, "male");
        const prompt2 = getPrompt("woman");
        console.log(`Generating image for prompt: ${prompt2}`);
        await generateAndSaveImage(prompt2, "female");
    }
}

main().catch(console.error);