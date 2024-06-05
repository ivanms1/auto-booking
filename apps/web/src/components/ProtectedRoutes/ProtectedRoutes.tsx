import React from "react";
import { Navigate, Outlet } from "react-router-dom"; 
import { useQuery } from "@tanstack/react-query";
import { authQueryKey } from "@/services/login/request";

const ProtectedRoutes = () => {
	const { data, isLoading } = useQuery({ ...authQueryKey.detail() }); 
	if(isLoading) {
		return <>Loading...</>
	}
	return data ? <Outlet /> : <Navigate to="/login"  replace />;
};

export default ProtectedRoutes;