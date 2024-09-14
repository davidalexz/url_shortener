import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
	try {
		const { getUrl } = await req.json();
		const urlCode = nanoid(6);

		const { data, error } = await supabase
			.from('urls')
			.insert({ original_url: getUrl, short_code: urlCode });

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
		const baseurl = process.env.NEXT_PUBLIC_SITE_URL;
		const shortUrl = `${baseurl}/${urlCode}`;

		return NextResponse.json({ short_url: shortUrl }, { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500,
		});
	}
}
