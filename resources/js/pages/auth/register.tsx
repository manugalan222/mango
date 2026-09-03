import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import { TextInput } from '@/components/mango/TextInput';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const enviar: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    return (
        <AuthLayout title="Armá tu casa" description="Una cuenta por casa. Los perfiles de cada uno vienen después.">
            <Head title="Crear cuenta" />

            <form className="flex flex-col gap-5" onSubmit={enviar}>
                <TextInput
                    id="name"
                    label="Cómo se llama la casa"
                    type="text"
                    required
                    autoFocus
                    autoComplete="name"
                    placeholder="Casa Galán"
                    ayuda="Es el nombre del hogar. Adentro vas a crear un perfil para cada uno de los que viven acá."
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                    disabled={processing}
                />

                <TextInput
                    id="email"
                    label="Correo de la casa"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="vos@ejemplo.com"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                    disabled={processing}
                />

                <TextInput
                    id="password"
                    label="Contraseña"
                    type="password"
                    required
                    autoComplete="new-password"
                    ayuda="Al menos 8 caracteres. La comparten todos los que viven acá."
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    disabled={processing}
                />

                <TextInput
                    id="password_confirmation"
                    label="Repetí la contraseña"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    error={errors.password_confirmation}
                    disabled={processing}
                />

                <Button type="submit" className="w-full" disabled={processing}>
                    {processing && <LoaderCircle aria-hidden className="animate-spin" />}
                    {processing ? 'Creando la casa' : 'Crear mi casa'}
                </Button>
            </form>

            <p className="text-tinta-2 text-center text-sm">
                ¿Ya tenés cuenta? <TextLink href={route('login')}>Entrá</TextLink>
            </p>
        </AuthLayout>
    );
}
