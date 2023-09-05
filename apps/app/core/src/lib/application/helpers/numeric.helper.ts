export const formatAsCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency }).format(amount)
}