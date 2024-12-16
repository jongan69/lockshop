export async function getStores() {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/stores`
    console.log('Fetching stores from:', apiUrl)
    
    const res = await fetch(apiUrl, {
      cache: 'no-store',
    })
    
    if (!res.ok) {
      const errorText = await res.text()
      console.error('Store fetch failed:', {
        status: res.status,
        statusText: res.statusText,
        error: errorText
      })
      throw new Error(`Failed to fetch stores: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch stores')
    }

    return data.stores
  } catch (error) {
    console.error('Error fetching stores:', error)
    throw error
  }
} 