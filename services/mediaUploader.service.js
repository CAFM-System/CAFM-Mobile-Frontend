import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const uploadMedia = async (file) => {
    if (!file) throw new Error('No file provided for upload.');

    console.log("File name: ", file.name);
    console.log("File uri: ", file.uri);

    const response = await fetch(file.uri);
    const arrayBuffer = await response.arrayBuffer();

    const fileName = `${Date.now()}${file.name}`;
    const { error } = await supabase.storage
        .from('images')
        .upload(fileName, arrayBuffer, {
            contentType: file.mimeType ?? file.type,
            upsert: false,
            cacheControl: '3600',
        });

    if (error) throw error;

    const { data } = supabase.storage.from('images').getPublicUrl(fileName);
    return data.publicUrl;
}

export default uploadMedia;