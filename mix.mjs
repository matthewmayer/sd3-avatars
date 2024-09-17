import fs from 'fs/promises';
import path from 'path';

async function mixImages() {
    const sourceDir = './';
    const targetDir = './generic';
    const subfolders = ['male', 'female'];

    // Create the target directory if it doesn't exist
    await fs.mkdir(targetDir, {
        recursive: true
    });

    for (let i = 1; i <= 50; i++) {
        for (let j = 0; j < subfolders.length; j++) {
            const sourceFile = path.join(sourceDir, subfolders[j], `${i}.jpg`);
            const targetFile = path.join(targetDir, `${i * 2 - (1 - j)}.jpg`);

            try {
                await fs.copyFile(sourceFile, targetFile);
                console.log(`Copied ${sourceFile} to ${targetFile}`);
            } catch (error) {
                console.error(`Error copying ${sourceFile}: ${error.message}`);
            }
        }
    }
}

mixImages().then(() => console.log('Done mixing images!')).catch(console.error);