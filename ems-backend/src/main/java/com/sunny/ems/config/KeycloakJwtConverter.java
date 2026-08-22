package com.sunny.ems.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

public class KeycloakJwtConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {

        Collection<GrantedAuthority> authorities = new ArrayList<>();
        Map<String, Object> realmAccess = jwt.getClaim("realm_access");

        if (realmAccess == null) {
            return authorities;
        }

        Object roles = realmAccess.get("roles");

        if (roles instanceof Collection<?> roleCollection) {
            for (Object role : roleCollection) {
                authorities.add(
                        new SimpleGrantedAuthority(
                        "ROLE_" + role.toString().toUpperCase()
                        )
                );
            }
        }

        return authorities;
    }
}