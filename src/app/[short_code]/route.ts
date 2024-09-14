import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET(
	req: NextRequest,
	{ params }: { params: { short_code: string } }
) {
	const { short_code } = params;

	try {
		// Fetch the original URL based on the short code
		const { data, error } = await supabase
			.from('urls')
			.select('original_url')
			.eq('short_code', short_code)
			.single();

		console.log('DATA FROM SUPABASE', data);

		if (error || !data) {
			console.error('Error or no data found:', error);
			return NextResponse.redirect('/404', { status: 404 });
		}

		const { original_url } = data;

		// Redirect to the original URL
		return NextResponse.redirect(original_url, { status: 302 });
	} catch (error) {
		console.error('Error fetching URL:', error);
		return NextResponse.redirect('/500', { status: 500 });
	}
}
