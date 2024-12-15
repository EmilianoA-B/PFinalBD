use LineaAereaBD;

create login APItest WITH PASSWORD = '12345';
create user APIUser for login APItest;
create role APIrole;

grant insert, delete, update, select, execute on schema :: dbo to APIrole;	
go

--Procedimiento para Administrar los trabajadores
create procedure sp_AdministrarTrabajadores
(
	@tipOp smallint,
	@idEmp smallint,
	@nomEmp varchar (20),
	@apaEmp varchar (15),
	@sexEmp varchar (1),
	@fnaEmp date,
	@idBarEmp smallint,
	@idPueEmp smallint,
	@idTipTraEmp smallint
) -- input
as
begin
	if @tipOp = 1
		insert into cat_trabajador 
		values (@idEmp,@nomEmp, 
		@apaEmp , @sexEmp,
		@fnaEmp, @idBarEmp, 
		@idPueEmp, @idTipTraEmp);
	else
	if @tipOp = 2
		update cat_trabajador 
		set nom_emp = @nomEmp, 
			apa_emp = @apaEmp, 
			sex_emp = @sexEmp,
			fna_emp = @fnaEmp,
			id_bar_emp = @idBarEmp,
			id_pue_emp = @idPueEmp,
			id_tiptra_emp = @idTipTraEmp
			where @idEmp = id_emp;
end;
go

--Procedimiento para Consultar a 1 trabajador o a todos.
create procedure sp_ConsultarTrabajador
(
	@idEmp smallint,
	@tipOp smallint
) -- input
as
begin
	if @tipOP = 1
		select id_emp as ID, nom_emp as Nombre, apa_emp as Apellido, sex_emp as Sexo, fna_emp as FechaNacimiento, id_bar_emp as Barrio, id_pue_emp as Puesto, id_tiptra_emp as TipoTrabajo
		from cat_trabajador
	if @tipOp = 2
		select id_emp as ID, nom_emp as Nombre, apa_emp as Apellido, sex_emp as Sexo, fna_emp as FechaNacimiento, id_bar_emp as Barrio, id_pue_emp as Puesto, id_tiptra_emp as TipoTrabajo
		from cat_trabajador
		where id_emp = @idEmp
end;
go


--Procedimiento para Eliminar a 1 trabajador o a todos.
create procedure sp_EliminarTrabajador
(
	@idEmp smallint
) --input
as
begin
	delete from cat_trabajador where id_emp = @idEmp;
end;
