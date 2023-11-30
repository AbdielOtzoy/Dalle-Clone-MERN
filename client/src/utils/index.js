import { surpriseMePrompts } from '../constants'
import FileSaver from 'file-saver'

export const getRandomPromt = (promt) => { 
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPromt = surpriseMePrompts[randomIndex];

    if(randomPromt === promt) return getRandomPromt(promt)

    return randomPromt
}

export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}