const fetchData = (url) => {
    const token = localStorage.getItem('token');
    if (token) {
        return fetch (url, {
            headers : {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then(
            (data) => {
                if (data.message === 'Please log in') {
                    this.props.history.push('/login');
                } else {
                    return data;
                }
            },
            () => {
                this.props.history.push('/login');
            }
        )
    } else {
        this.props.history.push('/login');
    }
}

export default fetchData;


