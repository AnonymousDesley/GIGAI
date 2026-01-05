import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '../../lib/supabase';
import * as Linking from 'expo-linking';

export default function AuthCallback() {
    const router = useRouter();
    const { access_token, refresh_token } = useLocalSearchParams<{ access_token: string; refresh_token: string }>();

    useEffect(() => {
        async function handleSession() {
            if (access_token && refresh_token) {
                const { error } = await supabase.auth.setSession({
                    access_token,
                    refresh_token,
                });

                if (!error) {
                    router.replace('/');
                } else {
                    console.error('[Callback] SetSession Error:', error.message);
                    router.replace('/auth/login');
                }
            } else {
                // Fallback for direct deep links if params aren't in search params
                const url = await Linking.getInitialURL();
                if (url) {
                    const { queryParams } = Linking.parse(url);
                    if (queryParams?.access_token && queryParams?.refresh_token) {
                        await supabase.auth.setSession({
                            access_token: queryParams.access_token as string,
                            refresh_token: queryParams.refresh_token as string,
                        });
                        router.replace('/');
                        return;
                    }
                }
                router.replace('/auth/login');
            }
        }

        handleSession();
    }, [access_token, refresh_token]);

    return (
        <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#fff" />
        </View>
    );
}
