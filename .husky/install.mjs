if (
    process.env.HUSKY === '0' ||
    process.env.CI ||
    process.env.VERCEL ||
    process.env.VERCEL_ENV ||
    process.env.NODE_ENV === 'production'
) {
    process.exit(0)
}

try {
    const { default: husky } = await import('husky')
    husky()
} catch {
    process.exit(0)
}