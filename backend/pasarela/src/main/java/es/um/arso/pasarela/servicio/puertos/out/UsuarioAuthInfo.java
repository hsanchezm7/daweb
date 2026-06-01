package es.um.arso.pasarela.servicio.puertos.out;

import com.google.gson.annotations.SerializedName;

public class UsuarioAuthInfo {

    private String id;

    @SerializedName(value = "nombre", alternate = {"nombreCompleto"})
    private String nombre;

    private String roles;

    public UsuarioAuthInfo() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }
}
