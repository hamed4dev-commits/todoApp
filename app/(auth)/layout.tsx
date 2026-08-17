export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section>
            <h1>Auth Layout</h1>
            {children}
        </section>
    );
}