export default function idCreator(): string {
    let char = 'qwerttyuiopasdfghjklzxcvbnm@$1230456789&.,=2546das8qw';
    let len = char.length;

    let id = '';
    for(let i=0; i<40; i++) {
        id += Math.floor(Math.random() * len);
    }
    
    return id
}