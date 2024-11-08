import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function BreederPage() {
  const navigate = useNavigate();
  return (
    <div>
        This is Breeder page
        <Button type="primary" onClick={() => navigate("/breeder-detail/1")}>Primary Button</Button>

    </div>
  )
}

export default BreederPage
