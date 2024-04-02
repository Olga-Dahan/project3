function formatPrice(price: number | undefined): string {
    return price ? `$${price.toFixed(2)}` : '';
}

export default formatPrice;